const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns'); // Import to get today's start and end times

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
  msgBodyModel,sendedMsgModel,studentMainDetailModel,schoolModel
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
      entry_by,school_id,
      message_body,
    } = req.body;
    const message_body2 = message_body;
    // msg_id ,msg_type,data_text,ordersno  // this message body also insert in difrent table
    const schoolIdsString = school_id.join(','); // Convert array to string "1,2,3"

    const newMasterMessage = await msgMasterModel.create({
      subject_text,
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
      const schoolIds = msgMaster.flatMap(msg => msg.school_id.split(',').map(Number)); // Extract and convert school_ids

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
        const ids = msg.school_id.split(',').map(Number);
        const schoolData = ids.map(id => schoolMapping[id]).filter(Boolean); // Get the full school data based on IDs
        return {
          ...msg.toJSON(), // Convert Sequelize instance to plain object
          schools: schoolData, // Add full school data to the message object
        };
      });

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
    const {msg_id} = req.query;
  
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
   
    const parsedMsgMasterBody = msgMaster_body.map((msg) => {
      return {
        ...msg.toJSON(), // Ensure sequelize data is converted to a plain object
        data_text: JSON.parse(msg.data_text), // Parse data_text from string to JSON
      };
    });


    if(msgMaster)
      {
          res.status(200).json({
            status: true,
             data: {msg_detail:msgMaster,msg_body:parsedMsgMasterBody},
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

// exports.getInboxMsgDetail = asyncHandler(async (req, res) => {
//   try {
//     const {mobile} = req.params;
  
//     const msgSendedMaster = await sendedMsgModel.findAll({
//       limit: 100,
//   order: [['sended_msg_id', 'DESC']] ,
//   where: {
//     mobile_no: mobile // Replace with the mobile number you want to filter by
//   },
//       include: [
//         {
//           model: msgMasterModel, // Include the subGroupModel to get msg_sgroup_mst
//          },
//          {
//           model: studentMainDetailModel, // Join with studentMainDetailModel
//           as: 'student', // Use the alias 'student' from the association
//           // attributes: ['student_name'], // Fetch only the student_name
//         }
//       ],
//     });
//     if(msgSendedMaster.length > 0)
//       {
//           res.status(200).json({
//             status: true,
//             length:msgSendedMaster.length,
//             data: msgSendedMaster,
//           });
//         }
//         else
//         {
//           res.status(200).json({
//             status: false,
//             length:msgSendedMaster.length,
//             data: msgSendedMaster,
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
//  100 % Working Code End============

// Chage above code
exports.getInboxMsgDetail = asyncHandler(async (req, res) => {
  try {
    const {mobile} = req.params;
  
    // Get the current date and time
    const now = new Date();
    const today = new Date(); // Current date

    const msgSendedMaster = await sendedMsgModel.findAll({
      limit: 100,
  order: [['sended_msg_id', 'DESC']] ,
  where: {
    mobile_no: mobile // Replace with the mobile number you want to filter by
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
//  100 % Working Code start============
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

    // const msgSendedMaster = await sendedMsgModel.findAll({
    //   order: [['sended_msg_id', 'DESC']],
    //   where: {
    //     mobile_no: mobile,
    //     sended_date: {
    //       [Op.gte]: startOfYesterday, // Greater than or equal to the start of yesterday
    //       [Op.lte]: endOfYesterday // Less than or equal to the end of yesterday
    //     }
    //   },
    //   include: [
    //     {
    //       model: msgMasterModel, // Include the msgMasterModel to get additional details
    //     },
    //     {
    //       model: studentMainDetailModel, // Join with studentMainDetailModel
    //       as: 'student', // Use the alias 'student' from the association
    //       // attributes: ['student_name'], // Fetch only the student_name
    //     }
    //   ],
    // });

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
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const Groups = await groupModel.findAll({
      limit: limit, // Apply limit for pagination
      offset: offset, // Apply offset for pagination
    });

    // Fetch the total count of records
    const totalCount = await groupModel.count(); // Get total count of records for pagination

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
      limit: limit,  // Apply limit for pagination
      offset: offset, // Apply offset for pagination
    });

    // Fetch the total count of records
    const totalCount = await subGroupModel.count(); // Get total count of records for pagination

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
