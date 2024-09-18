
const asyncHandler = require("express-async-handler");
const NoticeBoardModel = require("../models/noticeBoardModel.js"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


// exports.getNoticeBoardDetail = asyncHandler(async (req, res) => {
   
//     // Check if mobile number exists
//     const noticeboard = await NoticeBoardModel.findAll();

//    if (noticeboard.length>0) {
//       res.status(200)
//         .json({ status: true, message: "Data_Found", data:noticeboard });
//     } else {
//       res.status(200).json({ status: false, message: "No_Data_Found",data:null });
//     }
//   });

exports.getNoticeBoardDetail = asyncHandler(async (req, res) => {
  try {
    // Fetch all records from the NoticeBoard table
    const noticeboard = await NoticeBoardModel.findAll();

    // Check if any data exists
    if (noticeboard.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: noticeboard,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No_Data_Found",
        data: null,
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching notice board details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});