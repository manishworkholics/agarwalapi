const asyncHandler = require("express-async-handler");
// const ChatMessage = require("../models/ChatMessageModel"); 
const StudentModel  = require("../models/studentModel"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');
const {
    ChatMessage,msgMasterModel,
    groupModel,
    subGroupModel,    
    msgBodyModel,sendedMsgModel,
    studentMainDetailModel,feesDisplayModel
  } = require("../models/associations");

// Send a message
exports.sendMessage1 = asyncHandler(async (req, res) => {
    const { msg_id,sender_id,msg_type,chat_type,mobile_no, group_id, receiver_id, message } = req.body;
  //group is is main master msg id heeeeeeeeee
    try {
      const newMessage = await ChatMessage.create({
        sender_id,msg_id,mobile_no,chat_type,
        group_id: group_id || null,
        msg_type: msg_type || "TEXT",
        receiver_id: receiver_id || null,
        message,
      });
  
      res.status(201).json({
        status: true,
        message: "Message_Sent_Successfully",
        data: newMessage,
      });
    } catch (error) {
      console.error("Error sending message:", error.message);
      res.status(500).json({
        status: false,
        message: "An error occurred while sending the message",
        error: error.message,
      });
    }
  });
  
  // Retrieve messages for a specific group
  exports.getChatGroupMessagesByGroupId = asyncHandler(async (req, res) => {
    const { groupId } = req.query;
  const msg_id=groupId;

    try {
      
      const msgMaster = await msgMasterModel.findOne({
        where: { msg_id: msg_id },             
      });

      let studentDetails = [];
      if (msgMaster.five_mobile_number) {
        const fiveMobileNumbers = JSON.parse(msgMaster.five_mobile_number);
        const studentMainIds = fiveMobileNumbers.map((item) => item.student_main_id);
  
        // Fetch student details based on student_main_ids from student_main_detailModel
        studentDetails = await studentMainDetailModel.findAll({
          where: {
            student_main_id: studentMainIds,
          },
          attributes: ['student_main_id', 'student_name', 'student_number', 'student_family_mobile_number'], // Add desired fields
          raw: true, // To get raw data for processing
        });
  
        // Process the student_family_mobile_number to select only one number if there are two
        studentDetails = studentDetails.map((student) => {
          let mobileNumber = student.student_family_mobile_number;
  
          // Check if the mobile number contains two numbers (comma or space separated)
          if (mobileNumber && (mobileNumber.includes(',') || mobileNumber.includes(' '))) {
            // Split by comma or space and take only the first number
            mobileNumber = mobileNumber.split(/[,\s]+/)[0]; // Handle both commas and spaces
          }
  
          return {
            ...student,
            student_family_mobile_number: mobileNumber, // Replace with first number
          };
        });
      }


      const messages = await ChatMessage.findAll({
        where: { group_id: groupId ,chat_type:"GROUPCHAT"},
        order: [['sent_at', 'ASC']], // Order by sent_at ascending
        include: [
            {
              model: StudentModel,
              as: 'sender',
              attributes: ['student_name','student_number'], // Select desired fields
            },
            {
              model: StudentModel,
              as: 'receiver',
              attributes: ['student_name','student_number'], // Select desired fields
            },],
      });
  

      if (messages.length > 0) {
        res.status(200).json({
          status: true,
          message: "Messages_Found",
          data: messages,five_numbers_Details:studentDetails,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No_Messages_Found",
          data: [],
        });
      }
    } catch (error) {
      console.error("Error retrieving messages:", error.message);
      res.status(500).json({
        status: false,
        message: "An error occurred while retrieving messages",
        error: error.message,
      });
    }
  });

  // ====================CHat Msg For individual start here=================
  exports.sendMessage_individual_chat = async (req, res) => {
    const { msg_id, sender_id,msg_type, chat_type, mobile_no, group_id, message, receiverMobileNumbers } = req.body;

  try {
    // Check if the receiver mobile numbers are valid
    const validReceivers = await StudentModel.findAll({
      where: {
        student_family_mobile_number: receiverMobileNumbers.map(num => num.mobilenumber),
      },
    });

    if (validReceivers.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No valid receivers found.' });
    }

    // Save the message for each receiver
    const savedMessages = await Promise.all(validReceivers.map(async (receiver) => {
      return await ChatMessage.create({
        msg_id,msg_type,
        sender_id,
        chat_type,
        mobile_no,
        group_id,
        message,
        receiver_id: receiver.student_main_id, // Store the receiver's ID
      });
    }));

    res.status(201).json({
      status: true,
      data: {
        messages: savedMessages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Failed to send message.' });
  }
  };
  // =>postman post 
  // {
  //   "msg_id": 290,
  //   "sender_id": 17,
  //   "chat_type": "GROUPCHAT",
  //   "mobile_no": "1234567890",
  //   "group_id": 290,
  //   "message": "Hello everyone!",
  //   "receiverMobileNumbers": [
  //     {"student_main_id": 1, "mobilenumber": "1234567890"},
  //     {"student_main_id": 2, "mobilenumber": "2345678901"},
  //     {"student_main_id": 3, "mobilenumber": "3456789012"},
  //     {"student_main_id": 4, "mobilenumber": "4567890123"},
  //     {"student_main_id": 5, "mobilenumber": "5678901234"}
  //   ]
  // }
  
  // chat get individual
  // Function to get messages by chat_id
  //Postman =>  http://localhost:3000/api/chat/messages/290?user_ids=1,2,3

  exports.getMessages_individual_chat = async (req, res) => {
  // const { msg_id } = req.params;
  const { user_ids ,msg_id} = req.query; // Expecting user_ids to be a comma-separated string
  const userIdsArray = user_ids.split(',').map(id => parseInt(id, 10)); // Convert to an array of integers

  
  try {
    // Fetch messages that match msg_id and are either sent or received by the users in user_ids
    const messages = await ChatMessage.findAll({
      where: {
        msg_id,chat_type:'INDIVIDUALCHAT',
        [Op.or]: [
          { sender_id: { [Op.in]: userIdsArray } },
          { receiver_id: { [Op.in]: userIdsArray } }
        ]
      },
      order: [['sent_at', 'ASC']],
    });

    if (messages.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No messages found for this chat room.' });
    }
  res.json({
      status: true,
      messages,length:messages.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Failed to retrieve messages.' });
  }
};

