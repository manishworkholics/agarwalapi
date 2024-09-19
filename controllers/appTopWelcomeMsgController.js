
const asyncHandler = require("express-async-handler");
const appTopWelcomeMsgModel = require("../models/welcomeMsgModel"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";



exports.getappTopWelcomeMsgDetail = asyncHandler(async (req, res) => {
  try {
    // Fetch all records from the NoticeBoard table
    const appTopWelcomeMsg_detail = await appTopWelcomeMsgModel.findAll();

    // Check if any data exists
    if (appTopWelcomeMsg_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: appTopWelcomeMsg_detail,
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
    console.error("Error fetching appTopWelcomeMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});