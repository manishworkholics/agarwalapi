const asyncHandler = require("express-async-handler");
const scholarModel = require("../models/ScholarModel");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.insertScholarRecord = asyncHandler(async (req, res) => {
  try {
    // Get the array of records from request body
    const scholar_detail = req.body.data;

    if (scholar_detail.length > 0) {
      // Modify the data structure to match your Sequelize model fields
      const formattedData = scholar_detail.map((item) => ({
        sch_short_nm: item.SCHOOL_SHORT_NAME, // from request data
        mobile_no: item.MOBILE_NUMBER, // from request data
        scholar_no: item.STUDENT_ID, // from request data
        name: item.STUDENT_NAME, // from request data
        // Optionally add fields for scholar_type or scholar_otp
      }));

      // Insert records into the database
      await scholarModel.bulkCreate(formattedData, {
        ignoreDuplicates: true, // Optional: to avoid inserting duplicates
      });

      res.status(200).json({
        status: true,
        message: "Records inserted successfully",
        data: formattedData, // Return formatted data as confirmation
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.error("Error inserting scholar records:", error.message);
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

exports.getscholarDetail = asyncHandler(async (req, res) => {
  try {
    // Fetch all records from the NoticeBoard table
    const scholar_detail = await scholarModel.findAll({
      order: [
        ["scholar_data_id", "DESC"], // Replace 'createdAt' with the column you want to sort by
      ],
    });

    // Check if any data exists
    if (scholar_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: scholar_detail,
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
    console.error("Error fetching scholar  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

