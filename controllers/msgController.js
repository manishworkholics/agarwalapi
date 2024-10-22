const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns'); // Import to get today's start and end times
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
  msgBodyModel,sendedMsgModel,studentMainDetailModel,schoolModel,RepliedMessageModel,RepliedMsgBodyModel
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
      subject_text,msg_chat_type,five_mobile_number,
      show_upto,
      msg_priority,
      msg_sgroup_id,
      is_reply_type,
      is_reply_required_any,
      is_active,
      entry_by,school_id,
      message_body,
    } = req.body;
    const message_body2 = message_body;
    // msg_id ,msg_type,data_text,ordersno  // this message body also insert in difrent table
    const schoolIdsString = school_id.join(','); // Convert array to string "1,2,3"
   
    const newMasterMessage = await msgMasterModel.create({
      subject_text,msg_chat_type,five_mobile_number,
      show_upto,
      msg_priority,
      msg_sgroup_id,
      is_reply_type,
      is_reply_required_any,
      is_active,school_id:schoolIdsString,
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
//  const parentsData = await ParentModel.findAll({
 
// });
 
// for (let i = 0; i < parentsData.length; i++) {
//   const parent = parentsData[i]; // Access each parent using index i
  
//   await sendedMsgModel.create({
//     mobile_no: parent.mobile_no,
//     scholar_no: parent.scholar_no,
//     sch_short_nm: parent.sch_short_nm ? parent?.sch_short_nm : null,
//     msg_id: newm_msg_id, // Ensure newm_msg_id is defined in your scope
//     sended_date: new Date(), // Current date as the sended_date
//     sended_by: entry_by, // Ensure entry_by is defined in your scope
//     is_fcm_sended: 0, // Default value
//   });
// }

//==================================================================================


    res.status(200).json({
      status: "success",
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


exports.get_web_single_msg_master = asyncHandler(async (req, res) => {
  try {
    const { msg_id } = req.query; // Extract the msg_id from query parameters

    if (!msg_id) {
      return res.status(400).json({
        status: "error",
        message: "msg_id is required",
      });
    }

    // Fetch the single message by msg_id
    const msgMaster = await msgMasterModel.findOne({
      where: { msg_id: msg_id }, // Filter by msg_id
      include: [
        {
          model: subGroupModel, // Include subGroupModel to get msg_sgroup_mst
          include: [
            {
              model: groupModel, // Include groupModel within subGroupModel
            },
          ],
        },
        {
          model: msgBodyModel, // Include msgBodyModel to fetch data from msg_body
          order: [["ordersno", "ASC"]], // Order the results by ordersno
        },
      ],
    });

    // Check if data exists
    if (!msgMaster) {
      return res.status(404).json({
        status: "error",
        message: "Message not found",
      });
    }

    // Prepare an array of school IDs for querying
    const schoolIds = msgMaster?.school_id
      ? msgMaster.school_id.split(",").map(Number)
      : [];

    // Fetch all matching school records for the extracted IDs
    const schools = await schoolModel.findAll({
      where: {
        sch_id: {
          [Op.in]: schoolIds, // Use Op.in to match multiple IDs
        },
      },
    });

    // Create a mapping of school IDs to their full data
    const schoolMapping = schools.reduce((acc, school) => {
      acc[school.sch_id] = school; // Store the entire school object
      return acc;
    }, {});

    // Add full school data to the msgMaster record
    const schoolData = schoolIds.map((id) => schoolMapping[id]).filter(Boolean);
    const msgMasterWithSchoolData = {
      ...msgMaster.toJSON(), // Convert Sequelize instance to plain object
      schools: schoolData, // Add full school data to the message object
    };

    // Return the single message with school data
    res.status(200).json({
      status: "success",
      data: msgMasterWithSchoolData,
    });
  } catch (error) {
    console.error("Error fetching msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});


exports.delete_web_single_msg_master = asyncHandler(async (req, res) => {
  try {
    const { msg_id } = req.query; // Extract the msg_id from query parameters

    if (!msg_id) {
      return res.status(400).json({
        status: "error",
        message: "msg_id is required",
      });
    }

    // Fetch the single message by msg_id
    const msgMaster = await msgMasterModel.findOne({
      where: { msg_id: msg_id },
    });


    // Check if message exists
    if (!msgMaster) {
      return res.status(404).json({
        status: "error",
        message: "Message not found",
      });
    }

    // Update the is_active status to 0 (soft delete)
    msgMaster.is_active = 0;
    await msgMaster.save();

    // Return success response
    res.status(200).json({
      status: "success",
      message: "Message has been deactivated",
    });

  } catch (error) {
    console.error("Error updating message status:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// This is to all sent 100 % working
// exports.SentMsgToScholarData = asyncHandler(async (req, res) => {
//   try {
//     // Extract data from the request body
   
//   const {new_msg_id,admin_id} = req.query;
//   if(!new_msg_id)
//   {
//     res.status(500).json({
//       status: false, parentsData:0,
//       data: "",message:"Required Message Id"
//     });
//   }
// // =========== this is where  now get all mobile no and send  onsended model =======

//  // Step 1: Fetch all mobile numbers from parents table
//  const parentsData = await ParentModel.findAll({
 
// });
 
// for (let i = 0; i < parentsData.length; i++) {
//   const parent = parentsData[i]; // Access each parent using index i
  
//   await sendedMsgModel.create({
//     mobile_no: parent.mobile_no,
//     scholar_no: parent.scholar_no,
//     sch_short_nm: parent.sch_short_nm ? parent?.sch_short_nm : null,
//     msg_id: new_msg_id, // Ensure newm_msg_id is defined in your scope
//     sended_date: new Date(), // Current date as the sended_date
//     sended_by: admin_id, // Ensure entry_by is defined in your scope
//     is_fcm_sended: 0, // Default value
//   });
// }

// //==================================================================================
//   res.status(200).json({
//       status: "success",parentsData:parentsData.length,
//       message:"Success",
//     });
//   } catch (error) {
//     console.error("Error fetching msgBody with msgBody:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// Thios above 100 % working end

exports.SentMsgToScholarData = asyncHandler(async (req, res) => {
  try {
    //Note : - selected_ids   khali ayagi to sab ko jayaga
    // Extract data from the request query
    // GET /api/sent-msg?new_msg_id=123&admin_id=456
// GET /api/sent-msg?new_msg_id=123&admin_id=456&selected_ids=22010005,22010007

    const { new_msg_id, admin_id, selected_ids } = req.query; // Assuming selected_ids comes as a comma-separated string

    // Validate the new_msg_id
    if (!new_msg_id) {
      return res.status(400).json({
        status: false,
        parentsData: 0,
        data: "",
        message: "Required Message Id"
      });
    }

    // Step 1: Determine which parents to send messages to
    let parentsData;

    if (selected_ids && selected_ids.length > 0) {
      // Split the selected IDs and fetch corresponding parents
      const idsArray = selected_ids.split(',').map(id => id.trim());
      parentsData = await ParentModel.findAll({
        where: {
          scholar_no: idsArray // Fetch only parents with the selected scholar numbers
        }
      });
    } else {
      // Fetch all parents if no specific IDs are selected
      parentsData = await ParentModel.findAll();
    }

    // Step 2: Send messages to each selected parent and record in SendedMsgModel
    for (let parent of parentsData) {
      const { mobile_no, scholar_no, sch_short_nm } = parent; // Destructure properties

      await sendedMsgModel.create({
        mobile_no: mobile_no, // Mobile number from ParentModel
        scholar_no: scholar_no, // Scholar number from ParentModel
        sch_short_nm: sch_short_nm ? sch_short_nm : null, // Short name or null if not available
        msg_id: new_msg_id, // Message ID from request
        sended_date: new Date(), // Current date and time
        sended_by: admin_id, // Admin ID from request
        is_fcm_sended: 0, // Default value for FCM sent status
      });
    }

    // Return success response
    res.status(200).json({
      status: "success",
      parentsData: parentsData.length,
      message: "Messages sent successfully",
    });
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get All Msg getallmsg
// ====new working
// Start 10-10 working ==============
exports.getmsgMaster = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const msgMaster = await msgMasterModel.findAll({
      include: [
        {
          model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
          include: [
            {
              model: groupModel, // Include the groupModel within subGroupModel
            },
          ],
        },
        {
          model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
          order: [["ordersno", "ASC"]], // Order the results by ordersno
        },
      ],
      limit: limit, // Apply limit for pagination
      offset: offset, // Apply offset for pagination
    });

    // Fetch the total count of records
    const totalCount = await msgMasterModel.count(); // Get total count of records for pagination

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

    // Check if any data exists
    if (msgMaster.length > 0) {
      // Prepare an array of school IDs for querying
      // const schoolIds = msgMaster.flatMap(msg => msg?.school_id.split(',').map(Number)); // Extract and convert school_ids
      const schoolIds = msgMaster.flatMap(msg => {
        return msg?.school_id ? msg.school_id.split(',').map(Number) : [];
      });

      // Fetch all matching school records for the extracted IDs
const schools = await schoolModel.findAll({
  where: {
    sch_id: {
      [Op.in]: schoolIds, // Use Op.in to match multiple IDs
    },
  },
});

// Create a mapping of school IDs to their full data
const schoolMapping = schools.reduce((acc, school) => {
  acc[school.sch_id] = school; // Store the entire school object
  return acc;
}, {});

// Add full school data to each msgMaster record
const msgMasterWithSchoolData = msgMaster.map(msg => {
  const ids = msg.school_id ? msg.school_id.split(',').map(Number) : []; // Ensure school_id is valid
  const schoolData = ids.map(id => schoolMapping[id]).filter(Boolean); // Get the full school data based on IDs
  return {
    ...msg.toJSON(), // Convert Sequelize instance to plain object
    schools: schoolData, // Add full school data to the message object
  };
});


      // Fetch all matching school records for the extracted IDs
      // const schools = await schoolModel.findAll({
      //   where: {
      //     sch_id: {
      //       [Op.in]: schoolIds, // Use Op.in to match multiple IDs
      //     },
      //   },
      // });

      // // Create a mapping of school IDs to their full data
      // const schoolMapping = schools.reduce((acc, school) => {
      //   acc[school.sch_id] = school; // Store the entire school object
      //   return acc;
      // }, {});

      // // Add full school data to each msgMaster record
      // const msgMasterWithSchoolData = msgMaster.map(msg => {
      //   const ids = msg.school_id.split(',').map(Number);
      //   const schoolData = ids.map(id => schoolMapping[id]).filter(Boolean); // Get the full school data based on IDs
      //   return {
      //     ...msg.toJSON(), // Convert Sequelize instance to plain object
      //     schools: schoolData, // Add full school data to the message object
      //   };
      // });

      res.status(200).json({
        status: "success",
        data: msgMasterWithSchoolData,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Data Found",
        data: null,
        pagination: {
          currentPage: page,
          totalPages: 0, // No pages if no data is found
          limit: limit,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching msgMaster:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// 0ldddd
// exports.getmsgMaster = asyncHandler(async (req, res) => {
//   try {
//     // Extract pagination parameters from the query
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
//     const offset = (page - 1) * limit; // Calculate the offset for pagination

//     // Fetch records with pagination
//     const msgMaster = await msgMasterModel.findAll({
//       include: [
//         {
//           model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
//           include: [
//             {
//               model: groupModel, // Include the groupModel within subGroupModel
//             },
//           ],
//         },
//         {
//           model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
//           order: [["ordersno", "ASC"]], // Order the results by ordersno
//         },
//       ],
//       limit: limit, // Apply limit for pagination
//       offset: offset, // Apply offset for pagination
//     });

//     // Fetch the total count of records
//     const totalCount = await msgMasterModel.count(); // Get total count of records for pagination

//     // Calculate total pages
//     const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

//     // Check if any data exists
//     if (msgMaster.length > 0) {
//       res.status(200).json({
//         status: "success",
//         data: msgMaster,
//         pagination: {
//           currentPage: page,
//           totalPages: totalPages,
//           limit: limit,
//         },
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         message: "No Data Found",
//         data: null,
//         pagination: {
//           currentPage: page,
//           totalPages: 0, // No pages if no data is found
//           limit: limit,
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching msgMaster:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// ===========end 10-10-2024 working
// =================old
// exports.getmsgMaster = asyncHandler(async (req, res) => {
//   try {
//     const msgMaster = await msgMasterModel.findAll({
//       // include: [{
//       //   model: subGroupModel,
//       //   // attributes: ['msg_sgroup_id', 'msg_group_name'], // Select relevant fields from group
//       // }],
//       include: [
//         {
//           model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
//           include: [
//             {
//               model: groupModel, // Include the groupModel within subGroupModel
//               // attributes: ['msg_group_id', 'msg_group_name'], // Specify the fields you want from group
//             },
//           ],
//           // attributes: ['msg_sgroup_id', 'msg_sgroup_name'], // Specify fields from subGroupModel
//         },
//         {
//           model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
//           // attributes: ['msg_id', 'body_text', 'ordersno'], // Specify the fields from msg_body
//           order: [["ordersno", "ASC"]], // Order the results by ordersno
//         },
//       ],
//     });

//     res.status(200).json({
//       status: "success",
//       data: msgMaster,
//     });
//   } catch (error) {
//     console.error("Error fetching msgMaster with msgMaster:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

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
exports.get_Single_Msg_master_Detail_by_msg_id = asyncHandler(async (req, res) => {
  try {
    const {msg_id,sended_msg_id} = req.query;
    if(!msg_id || !sended_msg_id)
      {
          res.status(200).json({
            status: false,
            length:0,
            data: null,message:"msg_id & sended_msg_id Required"
          });
        }
// ========================================

// Step 1: Update the is_seen status for the specified message
const change = await sendedMsgModel.update(
  { is_seen: 1,seen_on:new Date() }, // Set is_seen to 1
  {
    where: {
      sended_msg_id: sended_msg_id,  
    },
  }
);
const getSendedmessDetail = await sendedMsgModel.findOne({ where: { sended_msg_id: sended_msg_id },});
// ========================================
    const msgMaster = await msgMasterModel.findOne({ where: { msg_id: msg_id },},{
      include: [
        {
          model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
          include: [
            {
              model: groupModel, // Include the groupModel within subGroupModel
            },
          ],
        },
        {
          model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
          order: [["ordersno", "ASC"]], // Order the results by ordersno
        },
      ],    
    });
   
    const msgMaster_body = await msgBodyModel.findAll({ where: { msg_id: msg_id },  order: [['ordersno', 'ASC']],});
  //  ==100 % working code start
    // const parsedMsgMasterBody = msgMaster_body.map((msg) => {
    //   return {
    //     ...msg.toJSON(), // Ensure sequelize data is converted to a plain object
    //     data_text: JSON.parse(msg.data_text), // Parse data_text from string to JSON
    //   };
    // });
// 100 % working code end 
const parsedMsgMasterBody = msgMaster_body.map((msg) => {
  const dataText = JSON.parse(msg.data_text);

  if (dataText.options && typeof dataText.options === 'string') {
    // Convert the options from a semicolon-separated string to an array of objects
    const optionsArray = dataText.options
      .split(';')
      .filter(option => option.trim() !== '') // Remove any empty options
      .map((option, index) => ({
        [`option`]: option.trim() // Use dynamic keys for option1, option2, etc.
        // [`option${index + 1}`]: option.trim() // Use dynamic keys for option1, option2, etc.
      }));

    // Update data_text with the new options array
    dataText.options = optionsArray;
  }

  return {
    ...msg.toJSON(),
    data_text: dataText,
  };
});

if(msgMaster)
      {
          res.status(200).json({
            status: true,
             data: {msg_detail:msgMaster,msg_body:parsedMsgMasterBody,is_reply_done:getSendedmessDetail.is_reply_done===1?1:0},
          });
        }
        else
        {
          res.status(200).json({
            status: false,
            data: {msg_detail:msgMaster,msg_body:msgMaster_body},
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
//priority set code check
// exports.get_Single_Msg_master_Detail_by_msg_id = asyncHandler(async (req, res) => {
//   try {
//     const {msg_id,sended_msg_id} = req.query;
//     if(!msg_id || !sended_msg_id)
//       {
//           res.status(200).json({
//             status: false,
//             length:0,
//             data: null,message:"msg_id & sended_msg_id Required"
//           });
//         }
// // ========================================
// const msgMasterCheck = await msgMasterModel.findOne({ where: { msg_id: msg_id },});
// const prioritycheck = msgMasterCheck?.msg_detail?.msg_priority;
// // Step 1: Update the is_seen status for the specified message
// if(prioritycheck === 1 || prioritycheck  === 2|| prioritycheck  === 3){}else{
// const change = await sendedMsgModel.update(
//   { is_seen: 1,seen_on:new Date() }, // Set is_seen to 1
//   {
//     where: {
//       sended_msg_id: sended_msg_id,  
//     },
//   }
// );}
// // ===============by priority updatestatusStart ===================

// //  await sendedMsgModel.update(
// //   { is_starred: star_status ,starred_on:new Date() }, // Set is_seen to 1
// //   {
// //     where: {
// //       sended_msg_id: sended_msg_id,  
// //     },
// //   }
// // );

// if(prioritycheck === 4 || prioritycheck  === 5)
// {
//    await sendedMsgModel.update(
//   { is_starred: star_status ,starred_on:new Date() }, // Set is_seen to 1
//   {
//     where: {
//       sended_msg_id: sended_msg_id,  
//     },
//   }
// );
// }
// // ===============by priority updatestatus End===================
// // ========================================
//     const msgMaster = await msgMasterModel.findOne({ where: { msg_id: msg_id },},{
//       include: [
//         {
//           model: subGroupModel, // Include the subGroupModel to get msg_sgroup_mst
//           include: [
//             {
//               model: groupModel, // Include the groupModel within subGroupModel
//             },
//           ],
//         },
//         {
//           model: msgBodyModel, // Include the msgBodyModel to fetch data from msg_body
//           order: [["ordersno", "ASC"]], // Order the results by ordersno
//         },
//       ],    
//     });
   
//     const msgMaster_body = await msgBodyModel.findAll({ where: { msg_id: msg_id },  order: [['ordersno', 'ASC']],});
//   //  ==100 % working code start
//     // const parsedMsgMasterBody = msgMaster_body.map((msg) => {
//     //   return {
//     //     ...msg.toJSON(), // Ensure sequelize data is converted to a plain object
//     //     data_text: JSON.parse(msg.data_text), // Parse data_text from string to JSON
//     //   };
//     // });
// // 100 % working code end 
// const parsedMsgMasterBody = msgMaster_body.map((msg) => {
//   const dataText = JSON.parse(msg.data_text);

//   if (dataText.options && typeof dataText.options === 'string') {
//     // Convert the options from a semicolon-separated string to an array of objects
//     const optionsArray = dataText.options
//       .split(';')
//       .filter(option => option.trim() !== '') // Remove any empty options
//       .map((option, index) => ({
//         [`option`]: option.trim() // Use dynamic keys for option1, option2, etc.
//         // [`option${index + 1}`]: option.trim() // Use dynamic keys for option1, option2, etc.
//       }));

//     // Update data_text with the new options array
//     dataText.options = optionsArray;
//   }

//   return {
//     ...msg.toJSON(),
//     data_text: dataText,
//   };
// });

// if(msgMaster)
//       {
//           res.status(200).json({
//             status: true,
//              data: {msg_detail:msgMaster,msg_body:parsedMsgMasterBody},
//           });
//         }
//         else
//         {
//           res.status(200).json({
//             status: false,
//             data: {msg_detail:msgMaster,msg_body:msgMaster_body},
//           });
//         }
//   } catch (error) {
//     console.error("Error fetching msgMaster with msgMaster:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// By sended_msg_id
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
//  100 % Working Code start============


exports.getInboxMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
  
    // Get the current date and time
    const now = new Date();
    const today = new Date(); // Current date
// Check any value tabed start ==========================
const mobileNumber = mobile.trim();

// Use Sequelize's Op.like to check for the matching number in a comma-separated field
const relatedProfiles = await studentMainDetailModel.findAll({
  where: {
    student_family_mobile_number: {
      [Op.like]: `%${mobileNumber}%`, // Find rows where mobile_no contains the number
    },
  },
});

let scholarNumbers = [];

// Iterate over related profiles to check tab_active_status
relatedProfiles.forEach(profile => {
  if (profile.tab_active_status === 1) {
    // If tab_active_status is 1, add the student_number to the list
   scholarNumbers.push(profile.student_number); // Adjust according to your model's field name
  }
});

// Check any value tabed start  
    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
     mobile_no: mobile 
    // student_number: { [Op.in]: activeStudentNumbers },
  },
      include: [
        {
          model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
          where: {
            show_upto: {
              [Op.gt]: today // Show only messages where show_upto is greater than today
            }
          }
        
        },
       
         {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });
    const filteredData = scholarNumbers.length > 0
    ? msgSendedMaster.filter(msg => scholarNumbers.includes(Number(msg.scholar_no)))
    : msgSendedMaster; // If scholarNumbers is empty, return all data
  
    // res.status(200).json({
    //           status: true,
    //           length:filteredData.length,
    //           data: filteredData,scholarNumbers
    //         });

    if(filteredData.length > 0)
      {
          res.status(200).json({
            status: true,
            length:filteredData.length,
            data: filteredData,scholarNumbers
          });
        }
        else
        {
          res.status(200).json({
            status: false,
            length:filteredData.length,
            data: filteredData,
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


//  100 % Working Code start============
exports.getSeenMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
    const mobileNumber = mobile.trim();

    // Use Sequelize's Op.like to check for the matching number in a comma-separated field
    const relatedProfiles = await studentMainDetailModel.findAll({
      where: {
        student_family_mobile_number: {
          [Op.like]: `%${mobileNumber}%`, // Find rows where mobile_no contains the number
        },
      },
    });
    
    let scholarNumbers = [];
    
    // Iterate over related profiles to check tab_active_status
    relatedProfiles.forEach(profile => {
      if (profile.tab_active_status === 1) {
        // If tab_active_status is 1, add the student_number to the list
       scholarNumbers.push(profile.student_number); // Adjust according to your model's field name
      }
    });
    
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

    const filteredData = scholarNumbers.length > 0
    ? msgSendedMaster.filter(msg => scholarNumbers.includes(Number(msg.scholar_no)))
    : msgSendedMaster; // If scholarNumbers is empty, return all data
  
    // res.status(200).json({
    //           status: true,
    //           length:filteredData.length,
    //           data: filteredData,scholarNumbers
    //         });

if(filteredData.length > 0)
{
    res.status(200).json({
      status: true,
      length:filteredData.length,
      data: filteredData,
    });
  }
  else
  {
    res.status(200).json({
      status: false,
      length:filteredData.length,
      data: filteredData,
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
    const mobileNumber = mobile.trim();

    // Use Sequelize's Op.like to check for the matching number in a comma-separated field
    const relatedProfiles = await studentMainDetailModel.findAll({
      where: {
        student_family_mobile_number: {
          [Op.like]: `%${mobileNumber}%`, // Find rows where mobile_no contains the number
        },
      },
    });
    
    let scholarNumbers = [];
    
    // Iterate over related profiles to check tab_active_status
    relatedProfiles.forEach(profile => {
      if (profile.tab_active_status === 1) {
        // If tab_active_status is 1, add the student_number to the list
       scholarNumbers.push(profile.student_number); // Adjust according to your model's field name
      }
    });
    
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

    const filteredData = scholarNumbers.length > 0
    ? msgSendedMaster.filter(msg => scholarNumbers.includes(Number(msg.scholar_no)))
    : msgSendedMaster; // If scholarNumbers is empty, return all data
  
    // res.status(200).json({
    //   status: true,
    //   length:filteredData.length,
    //   data: filteredData,scholarNumbers
    // });

if(filteredData.length > 0)
{
    res.status(200).json({
      status: true,
      length:filteredData.length,
      data: filteredData,
    });
  }
  else
  {
    res.status(200).json({
      status: false,
      length:filteredData.length,
      data: filteredData,
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
    const today = new Date(); // Current date

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
// Check any value tabed start ==========================
// =============================================
const mobileNumber = mobile.trim();

// Use Sequelize's Op.like to check for the matching number in a comma-separated field
const relatedProfiles = await studentMainDetailModel.findAll({
  where: {
    student_family_mobile_number: {
      [Op.like]: `%${mobileNumber}%`, // Find rows where mobile_no contains the number
    },
  },
});

let scholarNumbers = [];

// Iterate over related profiles to check tab_active_status
relatedProfiles.forEach(profile => {
  if (profile.tab_active_status === 1) {
    // If tab_active_status is 1, add the student_number to the list
   scholarNumbers.push(profile.student_number); // Adjust according to your model's field name
  }
});
// ===================================
    const msgSendedMaster = await sendedMsgModel.findAll({
      order: [['sended_msg_id', 'DESC']],
      where: {
        mobile_no: mobile,
        // sended_date: {
        //   [Op.gte]: startOfYesterday, // Greater than or equal to the start of yesterday
        //   [Op.lte]: endOfYesterday // Less than or equal to the end of yesterday
        // }
      },
      include: [
        {
          model: msgMasterModel, // Include the msgMasterModel to get additional details
          where: {
            show_upto: {
              [Op.gte]: startOfDay(today), // Start of today's date
              [Op.lte]: endOfDay(today)    // End of today's date
            }
          }
        },
        {
          model: studentMainDetailModel, // Join with studentMainDetailModel
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Fetch only the student_name
        }
      ],
    });

    const filteredData = scholarNumbers.length > 0
    ? msgSendedMaster.filter(msg => scholarNumbers.includes(Number(msg.scholar_no)))
    : msgSendedMaster; // If scholarNumbers is empty, return all data
  
    // res.status(200).json({
    //   status: true,
    //   length:filteredData.length,
    //   data: filteredData,scholarNumbers
    // });

    // Check if any messages were found
    if (filteredData.length > 0) {
      res.status(200).json({
        status: true,
        length: filteredData.length,
        data: filteredData,
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
// App Only Use 
exports.getSearchDetail = asyncHandler(async (req, res) => {
  try {
    const { mobile, searchquery } = req.query;

    // Check if mobile number is provided
    if (!mobile) {
      return res.status(400).json({
        status: false,
        message: "Mobile number is required",
      });
    }

    // Set up the where clause for the query
    const whereClause = {
      mobile_no: mobile,
    };

    // If search query is provided, add it to the where clause
    if (searchquery) {
      whereClause[Sequelize.Op.and] = [
        ...whereClause[Sequelize.Op.and] || [],
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('msg_mst.subject_text')), {
          [Sequelize.Op.like]: `%${searchquery.toLowerCase()}%`, // Use lower case for both column and query
        }),
      ];
    }

    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100, // Adjust limit as needed
      order: [['sended_msg_id', 'DESC']],
      where: whereClause,
      include: [
        {
          model: msgMasterModel, // Include message master model
          // attributes: ['subject_text'], // Uncomment if you want to fetch only specific fields
        },
        {
          model: studentMainDetailModel, // Include student details model
          as: 'student', // Use the alias 'student' from the association
          // attributes: ['student_name'], // Uncomment if you want to fetch only specific fields
        },
      ],
    });

    // Return the results
    if (msgSendedMaster.length === 0) {
      return res.status(200).json({
        status: false,
        length: 0,
        message: "No messages found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      length: msgSendedMaster.length,
      message: "Work available",
      data: msgSendedMaster,
    });

  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
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
// GetAll Group
exports.getGroupData = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const Groups = await groupModel.findAll({
      where: {
        is_deleted: 0, // Filter to exclude deleted records
    },
      limit: limit, // Apply limit for pagination
      offset: offset, // Apply offset for pagination
    });

    // Fetch the total count of records
    const totalCount = await groupModel.count(
      {where: {
        is_deleted: 0, // Filter to exclude deleted records
    },}); // Get total count of records for pagination

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

    // Check if any data exists
    if (Groups.length > 0) {
      res.status(200).json({
        status: "success",
        data: Groups,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Data Found",
        data: null,
        pagination: {
          currentPage: page,
          totalPages: 0, // No pages if no data is found
          limit: limit,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching groups:", error);
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
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const subGroups = await subGroupModel.findAll({
      include: [
        {
          model: groupModel,
          attributes: ["msg_group_id", "msg_group_name"], // Select relevant fields from group
        },
      ],
      where: {
        is_deleted: 0, // Only include undeleted records
    },
      limit: limit,  // Apply limit for pagination
      offset: offset, // Apply offset for pagination
    });

    // Fetch the total count of records
    const totalCount = await subGroupModel.count({ where: {
      is_deleted: 0, // Only include undeleted records
  },}); // Get total count of records for pagination

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

    // Check if any data exists
    if (subGroups.length > 0) {
      res.status(200).json({
        status: "success",
        data: subGroups,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No Data Found",
        data: null,
        pagination: {
          currentPage: page,
          totalPages: 0, // No pages if no data is found
          limit: limit,
        },
      });
    }
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



// 100 % Working This code is for App developer inbox like inbox type Don't edit
exports.AppInbox_testing2 = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.params;
    const today = new Date(); // Get the current date

    // Fetching all messages along with related group, subgroup, and student details
    const msgSendedMaster2 = await sendedMsgModel.findAll({
      limit: 100,
      order: [["sended_msg_id", "DESC"]],
      where: {
        mobile_no: mobile, // Filter by mobile number
      },
      include: [
        {
          model: msgMasterModel,
          as: "msg_mst", // Include msgMaster with alias
          where: {
            show_upto: {
              [Op.gt]: today, // Show messages where show_upto is greater than today
            },
          },
          include: [
            {
              model: subGroupModel, // Include subgroup
              as: "subgroup", // Alias for subgroup
              include: [
                {
                  model: groupModel, // Include group
                  as: "group", // Alias for group
                },
              ],
            },
          ],
        },
        {
          model: studentMainDetailModel, // Include student details
          as: "student", // Alias for student
        },
      ],
    });

    // Organize messages by group and subgroup
    const groupedData = {};

    msgSendedMaster2.forEach((message) => {
      const group = message.msg_mst.subgroup.group;
      const subgroup = message.msg_mst.subgroup;

      // Initialize group in the groupedData if not already present
      if (!groupedData[group.msg_group_id]) {
        groupedData[group.msg_group_id] = {
          msg_group_id: group.msg_group_id,
          msg_group_name: group.msg_group_name,
          subgroups: {},
        };
      }

      // Initialize subgroup in the group's subgroups if not already present
      if (!groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id]) {
        groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id] = {
          msg_sgroup_id: subgroup.msg_sgroup_id,
          msg_sgroup_name: subgroup.msg_sgroup_name,
          messages: [],
        };
      }

      // Push message to the corresponding subgroup
      groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id].messages.push({
        sended_msg_id: message.sended_msg_id,
        msg_id: message.msg_id,
        mobile_no: message.mobile_no,
        sch_short_nm: message.sch_short_nm,
        scholar_no: message.scholar_no,
        sended_date: message.sended_date,
        sended_by: message.sended_by,
        is_seen: message.is_seen,
        seen_on: message.seen_on,
        is_starred: message.is_starred,
        starred_on: message.starred_on,
        is_reply_done: message.is_reply_done,
        reply_on: message.reply_on,
        is_fcm_sended: message.is_fcm_sended,
        admission_id: message.admission_id,
        class_subject_videos_id: message.class_subject_videos_id,
        class_id: message.class_id,
        subject_id: message.subject_id,
        msg_mst: {
          msg_id: message.msg_mst.msg_id,
          subject_text: message.msg_mst.subject_text,
          show_upto: message.msg_mst.show_upto,
          msg_priority: message.msg_mst.msg_priority,
          msg_sgroup_id: message.msg_mst.msg_sgroup_id,
          is_reply_type: message.msg_mst.is_reply_type,
          is_reply_required_any: message.msg_mst.is_reply_required_any,
          is_active: message.msg_mst.is_active,
          school_id: message.msg_mst.school_id,
          createdAt: message.msg_mst.createdAt,
        },
        student: {
          student_main_id: message.student.student_main_id,
          student_name: message.student.student_name,
          color: message.student.color,
          student_number: message.student.student_number,
          student_family_mobile_number: message.student.student_family_mobile_number,
        },
      });
    });

    // Convert groupedData into an array format for better response formatting
    const response2 = Object.values(groupedData).map((group) => ({
      ...group,
      subgroups: Object.values(group.subgroups),
    }));

    res.status(200).json({
      status: true,
      length: msgSendedMaster2.length,
      groupedData: response2,
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
// This is for seen msg 100 % Working
exports.AppgetSeenMsgDetail_testing2 = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.params;
    const today = new Date(); // Get the current date

    // Fetching all messages along with related group, subgroup, and student details
    const msgSendedMaster2 = await sendedMsgModel.findAll({
      limit: 100,
      order: [["sended_msg_id", "DESC"]],
      where: {
        mobile_no: mobile, // Filter by mobile number
        is_seen:1
      },
      include: [
        {
          model: msgMasterModel,
          
          include: [
            {
              model: subGroupModel, // Include subgroup
              as: "subgroup", // Alias for subgroup
              include: [
                {
                  model: groupModel, // Include group
                  as: "group", // Alias for group
                },
              ],
            }, 
             
          ],
        },
        {
          model: studentMainDetailModel, // Include student details
          as: "student", // Alias for student
        },
      ],
    });

    // Organize messages by group and subgroup
    const groupedData = {};

    msgSendedMaster2.forEach((message) => {
      const group = message.msg_mst.subgroup.group;
      const subgroup = message.msg_mst.subgroup;

      // Initialize group in the groupedData if not already present
      if (!groupedData[group.msg_group_id]) {
        groupedData[group.msg_group_id] = {
          msg_group_id: group.msg_group_id,
          msg_group_name: group.msg_group_name,
          subgroups: {},
        };
      }

      // Initialize subgroup in the group's subgroups if not already present
      if (!groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id]) {
        groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id] = {
          msg_sgroup_id: subgroup.msg_sgroup_id,
          msg_sgroup_name: subgroup.msg_sgroup_name,
          messages: [],
        };
      }

      // Push message to the corresponding subgroup
      groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id].messages.push({
        sended_msg_id: message.sended_msg_id,
        msg_id: message.msg_id,
        mobile_no: message.mobile_no,
        sch_short_nm: message.sch_short_nm,
        scholar_no: message.scholar_no,
        sended_date: message.sended_date,
        sended_by: message.sended_by,
        is_seen: message.is_seen,
        seen_on: message.seen_on,
        is_starred: message.is_starred,
        starred_on: message.starred_on,
        is_reply_done: message.is_reply_done,
        reply_on: message.reply_on,
        is_fcm_sended: message.is_fcm_sended,
        admission_id: message.admission_id,
        class_subject_videos_id: message.class_subject_videos_id,
        class_id: message.class_id,
        subject_id: message.subject_id,
        msg_mst: {
          msg_id: message.msg_mst.msg_id,
          subject_text: message.msg_mst.subject_text,
          show_upto: message.msg_mst.show_upto,
          msg_priority: message.msg_mst.msg_priority,
          msg_sgroup_id: message.msg_mst.msg_sgroup_id,
          is_reply_type: message.msg_mst.is_reply_type,
          is_reply_required_any: message.msg_mst.is_reply_required_any,
          is_active: message.msg_mst.is_active,
          school_id: message.msg_mst.school_id,
          createdAt: message.msg_mst.createdAt,
        },
        student: {
          student_main_id: message.student.student_main_id,
          student_name: message.student.student_name,
          color: message.student.color,
          student_number: message.student.student_number,
          student_family_mobile_number: message.student.student_family_mobile_number,
        },
      });
    });

    // Convert groupedData into an array format for better response formatting
    const response2 = Object.values(groupedData).map((group) => ({
      ...group,
      subgroups: Object.values(group.subgroups),
    }));

    res.status(200).json({
      status: true,
      length: msgSendedMaster2.length,
      groupedData: response2,
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

// LastDay Msg 100 % Working
exports.AppgetLastdayMsgDetail_testing2 = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.params;
     // Get the current date and time
     const now = new Date();
     const today = new Date(); // Current date
 
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
 
    // Fetching all messages along with related group, subgroup, and student details
    const msgSendedMaster2 = await sendedMsgModel.findAll({
      limit: 100,
      order: [["sended_msg_id", "DESC"]],
      where: {
        mobile_no: mobile, // Filter by mobile number
      },
      include: [
        {
          model: msgMasterModel,
          as: "msg_mst", // Include msgMaster with alias
          where: {
            show_upto: {
              [Op.gte]: startOfDay(today), // Start of today's date
              [Op.lte]: endOfDay(today)    // End of today's date
            },
          },
          include: [
            {
              model: subGroupModel, // Include subgroup
              as: "subgroup", // Alias for subgroup
              include: [
                {
                  model: groupModel, // Include group
                  as: "group", // Alias for group
                },
              ],
            },
          ],
        },
        {
          model: studentMainDetailModel, // Include student details
          as: "student", // Alias for student
        },
      ],
    });

    // Organize messages by group and subgroup
    const groupedData = {};

    msgSendedMaster2.forEach((message) => {
      const group = message.msg_mst.subgroup.group;
      const subgroup = message.msg_mst.subgroup;

      // Initialize group in the groupedData if not already present
      if (!groupedData[group.msg_group_id]) {
        groupedData[group.msg_group_id] = {
          msg_group_id: group.msg_group_id,
          msg_group_name: group.msg_group_name,
          subgroups: {},
        };
      }

      // Initialize subgroup in the group's subgroups if not already present
      if (!groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id]) {
        groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id] = {
          msg_sgroup_id: subgroup.msg_sgroup_id,
          msg_sgroup_name: subgroup.msg_sgroup_name,
          messages: [],
        };
      }

      // Push message to the corresponding subgroup
      groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id].messages.push({
        sended_msg_id: message.sended_msg_id,
        msg_id: message.msg_id,
        mobile_no: message.mobile_no,
        sch_short_nm: message.sch_short_nm,
        scholar_no: message.scholar_no,
        sended_date: message.sended_date,
        sended_by: message.sended_by,
        is_seen: message.is_seen,
        seen_on: message.seen_on,
        is_starred: message.is_starred,
        starred_on: message.starred_on,
        is_reply_done: message.is_reply_done,
        reply_on: message.reply_on,
        is_fcm_sended: message.is_fcm_sended,
        admission_id: message.admission_id,
        class_subject_videos_id: message.class_subject_videos_id,
        class_id: message.class_id,
        subject_id: message.subject_id,
        msg_mst: {
          msg_id: message.msg_mst.msg_id,
          subject_text: message.msg_mst.subject_text,
          show_upto: message.msg_mst.show_upto,
          msg_priority: message.msg_mst.msg_priority,
          msg_sgroup_id: message.msg_mst.msg_sgroup_id,
          is_reply_type: message.msg_mst.is_reply_type,
          is_reply_required_any: message.msg_mst.is_reply_required_any,
          is_active: message.msg_mst.is_active,
          school_id: message.msg_mst.school_id,
          createdAt: message.msg_mst.createdAt,
        },
        student: {
          student_main_id: message.student.student_main_id,
          student_name: message.student.student_name,
          color: message.student.color,
          student_number: message.student.student_number,
          student_family_mobile_number: message.student.student_family_mobile_number,
        },
      });
    });

    // Convert groupedData into an array format for better response formatting
    const response2 = Object.values(groupedData).map((group) => ({
      ...group,
      subgroups: Object.values(group.subgroups),
    }));

    res.status(200).json({
      status: true,
      length: msgSendedMaster2.length,
      groupedData: response2,
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

// Starred 100% working
exports.AppgetStaredMsgDetail_testing2 = asyncHandler(async (req, res) => {
  try {
    const { mobile } = req.params;
    const today = new Date(); // Get the current date

    // Fetching all messages along with related group, subgroup, and student details
    const msgSendedMaster2 = await sendedMsgModel.findAll({
      limit: 100,
      order: [["sended_msg_id", "DESC"]],
      where: {
        mobile_no: mobile, // Filter by mobile number
        is_starred:1
      },
      include: [
        {
          model: msgMasterModel,
          as: "msg_mst", // Include msgMaster with alias
          include: [
            {
              model: subGroupModel, // Include subgroup
              as: "subgroup", // Alias for subgroup
              include: [
                {
                  model: groupModel, // Include group
                  as: "group", // Alias for group
                },
              ],
            },
          ],
        },
        {
          model: studentMainDetailModel, // Include student details
          as: "student", // Alias for student
        },
      ],
    });

    // Organize messages by group and subgroup
    const groupedData = {};

    msgSendedMaster2.forEach((message) => {
      const group = message.msg_mst.subgroup.group;
      const subgroup = message.msg_mst.subgroup;

      // Initialize group in the groupedData if not already present
      if (!groupedData[group.msg_group_id]) {
        groupedData[group.msg_group_id] = {
          msg_group_id: group.msg_group_id,
          msg_group_name: group.msg_group_name,
          subgroups: {},
        };
      }

      // Initialize subgroup in the group's subgroups if not already present
      if (!groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id]) {
        groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id] = {
          msg_sgroup_id: subgroup.msg_sgroup_id,
          msg_sgroup_name: subgroup.msg_sgroup_name,
          messages: [],
        };
      }

      // Push message to the corresponding subgroup
      groupedData[group.msg_group_id].subgroups[subgroup.msg_sgroup_id].messages.push({
        sended_msg_id: message.sended_msg_id,
        msg_id: message.msg_id,
        mobile_no: message.mobile_no,
        sch_short_nm: message.sch_short_nm,
        scholar_no: message.scholar_no,
        sended_date: message.sended_date,
        sended_by: message.sended_by,
        is_seen: message.is_seen,
        seen_on: message.seen_on,
        is_starred: message.is_starred,
        starred_on: message.starred_on,
        is_reply_done: message.is_reply_done,
        reply_on: message.reply_on,
        is_fcm_sended: message.is_fcm_sended,
        admission_id: message.admission_id,
        class_subject_videos_id: message.class_subject_videos_id,
        class_id: message.class_id,
        subject_id: message.subject_id,
        msg_mst: {
          msg_id: message.msg_mst.msg_id,
          subject_text: message.msg_mst.subject_text,
          show_upto: message.msg_mst.show_upto,
          msg_priority: message.msg_mst.msg_priority,
          msg_sgroup_id: message.msg_mst.msg_sgroup_id,
          is_reply_type: message.msg_mst.is_reply_type,
          is_reply_required_any: message.msg_mst.is_reply_required_any,
          is_active: message.msg_mst.is_active,
          school_id: message.msg_mst.school_id,
          createdAt: message.msg_mst.createdAt,
        },
        student: {
          student_main_id: message.student.student_main_id,
          student_name: message.student.student_name,
          color: message.student.color,
          student_number: message.student.student_number,
          student_family_mobile_number: message.student.student_family_mobile_number,
        },
      });
    });

    // Convert groupedData into an array format for better response formatting
    const response2 = Object.values(groupedData).map((group) => ({
      ...group,
      subgroups: Object.values(group.subgroups),
    }));

    res.status(200).json({
      status: true,
      length: msgSendedMaster2.length,
      groupedData: response2,
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


// Delete group (soft delete by updating is_deleted status)
exports.deleteGroup = asyncHandler(async (req, res) => {
  try {
      const { id } = req.params; // Get the group ID from the URL parameters

      // Find the group by ID
      const group = await groupModel.findOne({
          where: {
              msg_group_id: id,
          },
      });

      // Check if the group exists
      if (!group) {
          return res.status(404).json({
              status: false,
              message: "Group not found",
          });
      }

      // Update the is_deleted status to 1
      group.is_deleted = 1;
      await group.save(); // Save the updated instance

      // Return success response
      return res.status(200).json({
          status: true,
          message: "Group deleted successfully",
          data: group,
      });

  } catch (error) {
      console.error("Error deleting group:", error);
      return res.status(500).json({
          status: "error",
          message: "Internal server error",
          error: error.message,
      });
  }
});

exports.deleteSubGroup = asyncHandler(async (req, res) => {
  const { msg_sgroup_id } = req.params; // Get the subgroup ID from request parameters

  try {
      // Find the subgroup by ID
      const subgroup = await subGroupModel.findOne({
          where: {
              msg_sgroup_id: msg_sgroup_id,
              is_deleted: 0, // Ensure the subgroup is not already deleted
          },
      });

      // Check if the subgroup exists
      if (!subgroup) {
          return res.status(404).json({
              status: false,
              message: "Subgroup not found or already deleted.",
          });
      }

      // Update the is_deleted status to 1
      subgroup.is_deleted = 1;
      await subgroup.save(); // Save the updated subgroup

      // Return success response
      return res.status(200).json({
          status: true,
          message: "Subgroup deleted successfully.",
          data: subgroup,
      });
      
  } catch (error) {
      console.error("Error deleting subgroup:", error);
      return res.status(500).json({
          status: "error",
          message: "Internal server error",
          error: error.message,
      });
  }
});

exports.searchGroups = asyncHandler(async (req, res) => {
  try {
    const { searchquery, page = 1, limit = 10 } = req.query;

    // Check if search query is provided
    if (!searchquery) {
      return res.status(400).json({
        status: false,
        message: "searchquery is required",
      });
    }

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Search query for groups
    const whereClause = {
      [Sequelize.Op.and]: [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('msg_group_name')), {
          [Sequelize.Op.like]: `%${searchquery.toLowerCase()}%`, // Case-insensitive search on group name
        }),
        { is_deleted: 0 } // Only include undeleted groups
      ],
    };

    // Fetch the total number of matching records (for pagination)
    const totalRecords = await groupModel.count({
      where: whereClause,
    });

    // Fetch the paginated records that match the search query
    const groups = await groupModel.findAll({
      where: whereClause, // Apply search query filter
      limit: parseInt(limit), // Limit the number of results per page
      offset: parseInt(offset), // Skip records for pagination
      order: [['msg_group_id', 'DESC']], // Order by group ID in descending order
    });

    // Return the results
    if (groups.length === 0) {
      return res.status(200).json({
        status: false,
        length: 0,
        message: "No groups found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      length: groups.length,
      totalRecords, // Include the total number of matching records
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / limit), // Calculate total pages
      message: "Groups found",
      data: groups,
    });

  } catch (error) {
    console.error("Error fetching groups:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

exports.searchSubGroups = asyncHandler(async (req, res) => {
  try {
    const { searchquery, page = 1, limit = 10 } = req.query;

    // Check if search query is provided
    if (!searchquery) {
      return res.status(400).json({
        status: false,
        message: "searchquery is required",
      });
    }

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Search query for subgroups
    const whereClause = {
      [Sequelize.Op.and]: [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('msg_sgroup_name')), {
          [Sequelize.Op.like]: `%${searchquery.toLowerCase()}%`, // Case-insensitive search on subgroup name
        }),
        { is_deleted: 0 } // Only include undeleted subgroups
      ],
    };

    // Fetch the total number of matching records (for pagination)
    const totalRecords = await subGroupModel.count({
      where: whereClause,
    });

    // Fetch the paginated records that match the search query
    const subGroups = await subGroupModel.findAll({
      where: whereClause, // Apply search query filter
      limit: parseInt(limit), // Limit the number of results per page
      offset: parseInt(offset), // Skip records for pagination
      order: [['msg_sgroup_id', 'DESC']], // Order by subgroup ID in descending order
    });

    // Return the results
    if (subGroups.length === 0) {
      return res.status(200).json({
        status: false,
        length: 0,
        message: "No subgroups found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      length: subGroups.length,
      totalRecords, // Include the total number of matching records
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / limit), // Calculate total pages
      message: "Subgroups found",
      data: subGroups,
    });

  } catch (error) {
    console.error("Error fetching subgroups:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});
// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the file's MIME type to determine the storage location
    if (file.mimetype === 'application/pdf') {
      cb(null, 'Uploads/pdf/'); // PDF files go to the 'pdf' folder
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'Uploads/image/'); // Images go to the 'image' folder
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed.')); // Handle invalid types
    }
  },
  filename: (req, file, cb) => {
    // Remove spaces from the original file name
    const fileName = file.originalname.replace(/\s+/g, '');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + fileName); // Use unique filename to prevent conflicts
  }
});

const upload = multer({ storage });

// Middleware for handling file uploads
// exports.uploadFile = upload.single('file'); // Handle single file upload for FILE-INPUT or CAMERA-INPUT
exports.uploadFiles = upload.any();

// 100 % working below code 17-10-2024 don't delete
exports.insertRepliedMessageAndBodies = asyncHandler(async (req, res) => {
  try {
    const { msg_id, mobile_no,student_main_id,student_number,sended_msg_id, replyBodies } = req.body;

    // Validate required fields for RepliedMessageModel
    if (!msg_id || !mobile_no) {
      return res.status(400).json({
        status: false,
        message: "msg_id and mobile_no are required",
      });
    }

    // Validate that replyBodies is an array
    if (!Array.isArray(replyBodies) || replyBodies.length === 0) {
      return res.status(400).json({
        status: false,
        message: "replyBodies must be a non-empty array",
      });
    }

    // Insert into RepliedMessageModel
    const newRepliedMessage = await RepliedMessageModel.create({
      sended_msg_id: sended_msg_id,
      msg_id,
      mobile_no,student_main_id,student_number,
      reply_date_time: new Date(), // Defaults to current date if not provided
    });

    // Get the newly inserted replied_msg_id
    const replied_msg_id = newRepliedMessage.replied_msg_id;

    // Prepare bulk insert data for RepliedMsgBodyModel
    const bodyInsertData = replyBodies.map((body) => ({
      replied_msg_id: replied_msg_id, // Use the replied_msg_id from newRepliedMessage
      msg_body_id: body.msg_body_id, // Assuming body contains msg_body_id
      msg_type: body.msg_type, // Assuming msg_type is present in the body
      data_reply_text: body.data_reply_text, // Body text for each entry
    }));

    // Bulk insert into RepliedMsgBodyModel
    const newRepliedMsgBodies = await RepliedMsgBodyModel.bulkCreate(bodyInsertData);
   
    const result = await sendedMsgModel.update(
      {
          is_reply_done: 1,
          reply_on: new Date() // Sets the current date and time
      },
      {
          where: { sended_msg_id: sended_msg_id }
      }
  );
    // Return success response with data from both inserts
    return res.status(201).json({
      status: true,
      message: "Data inserted into RepliedMessageModel and multiple RepliedMsgBodyModel records successfully",
      repliedMessage: newRepliedMessage,
      repliedMsgBodies: newRepliedMsgBodies,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});


// Get All Reply Messages Sorted by Latest
exports.getAllReplyMessages = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  try {
    // Parse page and limit to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    
    // Calculate offset
    const offset = (pageNum - 1) * limitNum;

    // Fetch total count of reply messages for pagination
    const totalCount = await RepliedMessageModel.count();

    // Fetch reply messages with pagination, sorted by replied_msg_id in descending order
    const repliedMessages = await RepliedMessageModel.findAll({
      include: [
        {
          model: msgMasterModel,
          as: 'message',
        },
        {
          model: RepliedMsgBodyModel,
          as: 'replyBodies',
        },
        {
          model: sendedMsgModel,
          as: 'sendedMessage',
        },
      ],
      order: [['replied_msg_id', 'DESC']], // Sort by replied_msg_id in descending order
      limit: limitNum,
      offset: offset,
    });

    // Extract school IDs from messages and fetch their details
    const schoolDetails = await Promise.all(repliedMessages.map(async (msg) => {
      const schoolIds = msg.message.school_id.split(','); // Split the school_id string
      const schools = await schoolModel.findAll({
        where: {
          sch_id: {
            [Op.in]: schoolIds, // Use Sequelize's Op.in to fetch multiple records
          },
        },
      });

      return {
        ...msg.get(), // Include all message data
        schools, // Add the fetched school details
      };
    }));

    // Return the combined data with school details and pagination info
    return res.status(200).json({
      status: true,
      message: "All reply messages retrieved successfully, sorted by latest",
      data: schoolDetails,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Error fetching reply messages:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// exports.getAllReplyMessages = asyncHandler(async (req, res) => {
//   try {
//     // Fetch all reply messages, sorted by reply_date_time in descending order
//     const repliedMessages = await RepliedMessageModel.findAll({
//       include: [
//         {
//           model: msgMasterModel,
//           as: 'message', // Alias must match the 'as' used in the association
//         },
//         {
//           model: RepliedMsgBodyModel,
//           as: 'replyBodies', // This will include reply body data
//         },
//         {
//           model: sendedMsgModel,
//           as: 'sendedMessage', // Include sended message data
//           // attributes: ['msg_id', 'message_text'], // Select specific fields if needed
//         },
//       ],
//       order: [['replied_msg_id', 'DESC']], // Sort by replied_msg_id in descending order
//     });

//     // Extract school IDs from messages and fetch their details
//     const schoolDetails = await Promise.all(repliedMessages.map(async (msg) => {
//       const schoolIds = msg.message.school_id.split(','); // Split the school_id string
//       const schools = await schoolModel.findAll({
//         where: {
//           sch_id: {
//             [Op.in]: schoolIds, // Use Sequelize's Op.in to fetch multiple records
//           },
//         },
//       });

//       return {
//         ...msg.get(), // Include all message data
//         schools, // Add the fetched school details
//       };
//     }));

//     // Return the combined data with school details
//     return res.status(200).json({
//       status: true,
//       message: "All reply messages retrieved successfully, sorted by latest",
//       data: schoolDetails,
//     });
//   } catch (error) {
//     console.error("Error fetching reply messages:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
