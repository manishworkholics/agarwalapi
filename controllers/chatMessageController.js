const asyncHandler = require("express-async-handler");
// const ChatMessage = require("../models/ChatMessageModel"); 
const StudentModel  = require("../models/studentModel"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');
const {
    ChatMessage
    // groupModel,
    // subGroupModel,
    // msgMasterModel,
    // msgBodyModel,sendedMsgModel,
    // studentMainDetailModel,feesDisplayModel
  } = require("../models/associations");

// Send a message
exports.sendMessage1 = asyncHandler(async (req, res) => {
    const { msg_id,sender_id,mobile_no, group_id, receiver_id, message } = req.body;
  //group is is main master msg id heeeeeeeeee
    try {
      const newMessage = await ChatMessage.create({
        sender_id,msg_id,mobile_no,
        group_id: group_id || null,
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
  
    try {
      const messages = await ChatMessage.findAll({
        where: { group_id: groupId },
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
          data: messages,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No_Messages_Found",
          data: null,
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