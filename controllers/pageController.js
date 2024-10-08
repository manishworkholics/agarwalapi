
const asyncHandler = require("express-async-handler");
const pageModel = require("../models/pageModel"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');



exports.getAllpageDetail = asyncHandler(async (req, res) => {
  try {
    // Fetch all records from the NoticeBoard table
    const page_detail = await pageModel.findAll();

    // Check if any data exists
    if (page_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: page_detail,
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
    console.error("Error fetching page  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

// Add a new page 
exports.addpage = asyncHandler(async (req, res) => {
    const { numberassign, title, detail } = req.body;
   
    // Check for missing fields
    if (!numberassign || !title || !detail) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields. Ensure numberassign, title, and detail are provided."
      });
    }
  
    try {
      // Create new page if all fields are present
      const newpage = await pageModel.create({ numberassign, title, detail });
  
      res.status(201).json({
        status: true,
        message: "Page added successfully",
        data: newpage,
      });

    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error adding page",
        error: error.message,
      });
    }
  });
  

// Get a single page by ID
exports.getpageDetail = asyncHandler(async (req, res) => {
  const { pageid } = req.params;

  try {
    const page = await pageModel.findByPk(pageid);

    if (page) {
      res.status(200).json({
        status: true,
        message: "page found",
        data: page,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "page not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching page",
      error: error.message,
    });
  }
});

// Update an existing page
exports.updatepage = asyncHandler(async (req, res) => {
  const { pageid } = req.params;
  const {  numberassign, title, detail } = req.body;

  try {
    const page = await pageModel.findByPk(pageid);

    if (page) {
        
      page.numberassign = numberassign;
      page.title = title;
      page.detail = detail;
      await page.save();

      res.status(200).json({
        status: true,
        message: "page updated successfully",
        data: page,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "page not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating page",
      error: error.message,
    });
  }
});
