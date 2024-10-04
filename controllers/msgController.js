const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const asyncHandler = require("express-async-handler");
const appScrollerModel = require("../models/appScrollerMsgModel");
const welcomeModel = require("../models/welcomeMsgModel");
const CategoryModel = require("../models/categoryModel");
const ParentModel = require("../models/parentModel");
// const MsgBodyModel = require("../models/msgBodyModel");
// const GroupModel = require("../models/msgGroupModel");
// const SubGroupModel = require("../models/msgSubGroupModel");
const {
  groupModel,
  subGroupModel,
  msgMasterModel,
  msgBodyModel,sendedMsgModel,studentMainDetailModel
} = require("../models/associations");

const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');


exports.insertMsgData = asyncHandler(async (req, res) => {
  try {
    // Extract data from the request body
    const {
      subject_text,
      show_upto,
      msg_priority,
      msg_sgroup_id,
      is_reply_type,
      is_reply_required_any,
      is_active,
      entry_by,
      message_body,
    } = req.body;
    const message_body2 = message_body;
    // msg_id ,msg_type,data_text,ordersno  // this message body also insert in difrent table

    const newMasterMessage = await msgMasterModel.create({
      subject_text,
      show_upto,
      msg_priority,
      msg_sgroup_id,
      is_reply_type,
      is_reply_required_any,
      is_active,
      entry_by,
    });
    const newm_msg_id = newMasterMessage?.msg_id;
    // Parse message_body if it's in JSON format or already structured
    const messageBodyArray = Array.isArray(message_body)
      ? message_body
      : [message_body];

    // Loop through message body and insert each entry into MsgBodyModel
    for (let i = 0; i < messageBodyArray.length; i++) {
      const { msg_type, data_text, is_reply_required, order_number } =
        messageBodyArray[i];

      // Insert the message body data into the MsgBodyModel
      await msgBodyModel.create({
        msg_id: newm_msg_id,
        msg_type,
        data_text,
        is_reply_required,
        ordersno: order_number, // Assuming 'ordersno' is sequential based on the array order
      });
    }
// =========== this is where  now get all mobile no and send  onsended model =======

 // Step 1: Fetch all mobile numbers from parents table
 const parentsData = await ParentModel.findAll({
 
});
 
for (let i = 0; i < parentsData.length; i++) {
  const parent = parentsData[i]; // Access each parent using index i
  
  await sendedMsgModel.create({
    mobile_no: parent.mobile_no,
    scholar_no: parent.scholar_no,
    sch_short_nm: parent.sch_short_nm ? parent?.sch_short_nm : null,
    msg_id: newm_msg_id, // Ensure newm_msg_id is defined in your scope
    sended_date: new Date(), // Current date as the sended_date
    sended_by: entry_by, // Ensure entry_by is defined in your scope
    is_fcm_sended: 0, // Default value
  });
}

//==================================================================================


    res.status(200).json({
      status: "success",parentsData:parentsData.length,
      data: newMasterMessage,
    });
  } catch (error) {
    console.error("Error fetching msgBody with msgBody:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getmsgMaster = asyncHandler(async (req, res) => {
  try {
    const msgMaster = await msgMasterModel.findAll({
      // include: [{
      //   model: subGroupModel,
      //   // attributes: ['msg_sgroup_id', 'msg_group_name'], // Select relevant fields from group
      // }],
      include: [
        {
          model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
          include: [
            {
              model: groupModel, // Include the groupModel within subGroupModel
              // attributes: ['msg_group_id', 'msg_group_name'], // Specify the fields you want from group
            },
          ],
          // attributes: ['msg_sgroup_id', 'msg_sgroup_name'], // Specify fields from subGroupModel
        },
        {
          model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
          // attributes: ['msg_id', 'body_text', 'ordersno'], // Specify the fields from msg_body
          order: [["ordersno", "ASC"]], // Order the results by ordersno
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: msgMaster,
    });
  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getmsgbody = asyncHandler(async (req, res) => {
  try {
    const msgBody = await MsgBodyModel.findAll({});

    res.status(200).json({
      status: "success",
      data: msgBody,
    });
  } catch (error) {
    console.error("Error fetching msgBody with msgBody:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});
// ============================ App Related app ki api start ===================================
// ============================ App Related app ki api start ===================================

exports.getSingleMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {sended_msg_id} = req.params;
  
  // Step 1: Update the is_seen status for the specified message
  const change = await sendedMsgModel.update(
    { is_seen: 1,seen_on:new Date() }, // Set is_seen to 1
    {
      where: {
        sended_msg_id: sended_msg_id,  
      },
    }
  );

    const msgSendedMaster = await sendedMsgModel.findOne({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
    sended_msg_id: sended_msg_id // Replace with the mobile number you want to filter by
  },
      include: [
        {
          model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
         },
         {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        },
        {
          model: msgBodyModel, // Include msg_body details
          as: 'msgBody', // Use the alias defined in the association
          required: true, // Ensures that it only returns records with matching msg_id
          where: {
            msg_id: Sequelize.col('sended_msg.msg_id'), // Adjust this to use the correct column reference
          },
        },
        // {
        //   model: msgBodyModel, // Join with msgBodyModel to get the message body
        //   as: 'messageBody', // Alias for the join
        // //  attributes: ['msg_body'], // Fetch only the msg_body field
        // }
      ],
    });
    
    if(msgSendedMaster)
      {
          res.status(200).json({
            status: true,
            length:msgSendedMaster.length,
            data: msgSendedMaster,
          });
        }
        else
        {
          res.status(200).json({
            status: false,
            length:msgSendedMaster.length,
            data: msgSendedMaster,
          });
        }
  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getInboxMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
  
    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
    mobile_no: mobile // Replace with the mobile number you want to filter by
  },
      include: [
        {
          model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
         },
         {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });
    if(msgSendedMaster.length > 0)
      {
          res.status(200).json({
            status: true,
            length:msgSendedMaster.length,
            data: msgSendedMaster,
          });
        }
        else
        {
          res.status(200).json({
            status: false,
            length:msgSendedMaster.length,
            data: msgSendedMaster,
          });
        }
  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getSeenMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
  
    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
    mobile_no: mobile,
    is_seen:1
  },
      include: [
        {
          model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
         },
         {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });
if(msgSendedMaster.length > 0)
{
    res.status(200).json({
      status: true,
      length:msgSendedMaster.length,
      data: msgSendedMaster,
    });
  }
  else
  {
    res.status(200).json({
      status: false,
      length:msgSendedMaster.length,
      data: msgSendedMaster,
    });
  }
  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getStaredMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
  
    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
    mobile_no: mobile,
    is_starred:1
  },
      include: [
        {
          model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
         },
         {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });
if(msgSendedMaster.length > 0)
{
    res.status(200).json({
      status: true,
      length:msgSendedMaster.length,
      data: msgSendedMaster,
    });
  }
  else
  {
    res.status(200).json({
      status: false,
      length:msgSendedMaster.length,
      data: msgSendedMaster,
    });
  }
  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getLastdayMsgDetail = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.params;

    // Get the current date and time
    const now = new Date();
    
    // Calculate the start of today (midnight)
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    // Calculate the start of yesterday (midnight)
    const startOfYesterday = new Date(now);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0);

    // Calculate the end of yesterday (just before midnight)
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setHours(23, 59, 59, 999); // Last millisecond of the day

    const msgSendedMaster = await sendedMsgModel.findAll({
      order: [['sended_msg_id', 'DESC']],
      where: {
        mobile_no: mobile,
        sended_date: {
          [Op.gte]: startOfYesterday, // Greater than or equal to the start of yesterday
          [Op.lte]: endOfYesterday // Less than or equal to the end of yesterday
        }
      },
      include: [
        {
          model: msgMasterModel, // Include the msgMasterModel to get additional details
        },
        {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });

    // Check if any messages were found
    if (msgSendedMaster.length > 0) {
      res.status(200).json({
        status: true,
        length: msgSendedMaster.length,
        data: msgSendedMaster,
      });
    } else {
      // Return an empty response if no messages found
      res.status(200).json({
        status: false,
        length: 0,
        data: [] // Return an empty array
      });
    }
  } catch (error) {
    console.error("Error fetching last day messages:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.seenStatusUpdateMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {sended_msg_id} = req.params;
  

     // Step 1: Update the is_seen status for the specified message
     const change = await sendedMsgModel.update(
      { is_seen: 1,seen_on:new Date() }, // Set is_seen to 1
      {
        where: {
          sended_msg_id: sended_msg_id,  
        },
      }
    );

    // Step 2: Check if the update was successful
    if (change[0] === 0) {
      // No rows were updated, meaning the sended_msg_id might not exist
      return res.status(200).json({
        status: false,
        message: "Message not found or already seen",
      });
    }

    // Step 3: Return a success response
    res.status(200).json({
      status: true,
      message: "Seen status updated successfully",
    });

  } catch (error) {
    console.error("Error fetching msgMaster with msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.staredStatusUpdateMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {sended_msg_id} = req.params;
    const { star_status } = req.body;

    
     // Step 1: Update the is_seen status for the specified message
     const change = await sendedMsgModel.update(
      { is_starred: star_status ,starred_on:new Date() }, // Set is_seen to 1
      {
        where: {
          sended_msg_id: sended_msg_id,  
        },
      }
    );

    // Step 2: Check if the update was successful
    if (change[0] === 0) {
      // No rows were updated, meaning the sended_msg_id might not exist
      return res.status(200).json({
        status: false,
        message: "Message not found or already Starred",
      });
    }

    // Step 3: Return a success response
    res.status(200).json({
      status: true,
      message: "Starred status updated successfully",
    });

  } catch (error) {
    console.error("Error fetching :", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ============================ App Related app ki api End ===================================
// ============================ App Related app ki api End ===================================

//====================== Group =================================
exports.addSingleGroupData = asyncHandler(async (req, res) => {
  try {
    const { msg_group_name, is_active, added_user_id } = req.body;

    // Validate the required fields
    if (!msg_group_name || !is_active || !added_user_id) {
      return res.status(400).json({
        status: "error",
        message:
          "Please provide all required fields: msg_group_name, is_active, and added_user_id",
      });
    }

    // Create a new group entry in the database
    const newGroup = await groupModel.create({
      msg_group_name,
      is_active,
      added_date: new Date(), // Automatically set the added_date to the current date
      added_user_id,
    });

    // Return a success response with the new group data
    res.status(201).json({
      status: "success",
      message: "Group created successfully",
      data: newGroup,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.updateSingleGroupData = asyncHandler(async (req, res) => {
  try {
    const { msg_group_id } = req.params; // Get the group ID from the URL params
    const { msg_group_name, is_active, edited_user_id } = req.body; // Get the updated details from the request body

    // Check if the group ID is provided
    if (!msg_group_id) {
      return res.status(400).json({
        status: "error",
        message: "Group ID is required to update the group",
      });
    }

    // Find the group by ID
    const group = await groupModel.findByPk(msg_group_id);

    if (!group) {
      return res.status(404).json({
        status: "error",
        message: "Group not found",
      });
    }

    // Update the group details
    await group.update({
      msg_group_name: msg_group_name || group.msg_group_name, // Keep existing name if not provided
      is_active: is_active !== undefined ? is_active : group.is_active, // Keep existing status if not provided
      edited_date: new Date(), // Set current date for the edit
      edited_user_id: edited_user_id || group.edited_user_id, // Keep existing user if not provided
    });

    // Return a success response
    res.status(200).json({
      status: "success",
      message: "Group updated successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getGroupData = asyncHandler(async (req, res) => {
  try {
    const Groups = await groupModel.findAll({
      // include: [{
      //   model: groupModel,
      //   attributes: ['msg_group_id', 'msg_group_name'], // Select relevant fields from group
      // }],
    });

    res.status(200).json({
      status: "success",
      data: Groups,
    });
  } catch (error) {
    console.error("Error fetching groups with groups:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getSingleGroupData = asyncHandler(async (req, res) => {
  try {
    // Get the group ID from the request parameters
    const { id } = req.params;

    // Fetch the group by msg_group_id
    const group = await groupModel.findOne({
      where: { msg_group_id: id },
      // Optionally, include subgroups if needed
      // include: [{
      //   model: subGroupModel,
      //   attributes: ['msg_sub_group_id', 'msg_sub_group_name'],
      // }],
    });

    // Check if group exists
    if (!group) {
      return res.status(404).json({
        status: "error",
        message: `Group with id ${id} not found`,
      });
    }

    // Return the group data if found
    res.status(200).json({
      status: "success",
      data: group,
    });
  } catch (error) {
    console.error("Error fetching group by id:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

//======================= Sub Group ============================

// Add new subgroup
exports.addSubGroup = asyncHandler(async (req, res) => {
  try {
    // Get the details from the request body
    const { msg_sgroup_name, is_active, added_user_id, msg_group_id } =
      req.body;

    // Validate required fields
    if (!msg_sgroup_name || !msg_group_id) {
      return res.status(400).json({
        status: "error",
        message: "Subgroup name and group ID are required",
      });
    }

    // Create a new subgroup entry
    const newSubGroup = await subGroupModel.create({
      msg_sgroup_name,
      is_active: is_active || "1", // Default to active if not provided
      added_date: new Date(),
      added_user_id,
      msg_group_id,
    });

    // Send response back
    res.status(201).json({
      status: "success",
      message: "Subgroup created successfully",
      data: newSubGroup,
    });
  } catch (error) {
    console.error("Error creating subgroup:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get single subgroup detail by ID
exports.getSingleSubGroup = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subgroup by ID
    const subGroup = await subGroupModel.findOne({
      where: { msg_sgroup_id: id },
    });

    // If subgroup not found, return 404
    if (!subGroup) {
      return res.status(404).json({
        status: "error",
        message: "Subgroup not found",
      });
    }

    // Return the subgroup data
    res.status(200).json({
      status: "success",
      data: subGroup,
    });
  } catch (error) {
    console.error("Error fetching subgroup:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.getSubGroupData = asyncHandler(async (req, res) => {
  try {
    const subGroups = await subGroupModel.findAll({
      include: [
        {
          model: groupModel,
          attributes: ["msg_group_id", "msg_group_name"], // Select relevant fields from group
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: subGroups,
    });
  } catch (error) {
    console.error("Error fetching subgroups with groups:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update subgroup detail by ID
exports.updateSubGroup = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      msg_sgroup_name, 
      is_active, 
      msg_group_id,
      edited_user_id 
    } = req.body; // Extract required fields from the request body

    // Find the subgroup by ID and update its details
    const [updated] = await subGroupModel.update(
      {
        msg_sgroup_name,
        is_active,
        msg_group_id,
        edited_user_id,      // Update edited_user_id
        edited_date: new Date(), // Update the edited_date to current date
        updatedAt: new Date(), // Update the timestamp
      },
      {
        where: { msg_sgroup_id: id },
      }
    );

    // If no rows were updated, return 404
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'Subgroup not found or no changes made',
      });
    }

    // Fetch the updated subgroup details
    const updatedSubGroup = await subGroupModel.findOne({
      where: { msg_sgroup_id: id },
    });

    // Return the updated subgroup data
    res.status(200).json({
      status: 'success',
      data: updatedSubGroup,
    });
  } catch (error) {
    console.error('Error updating subgroup:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
});
