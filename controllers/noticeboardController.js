
const asyncHandler = require("express-async-handler");
const NoticeBoardModel = require("../models/noticeBoardModel.js"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');


//For Android App
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

exports.getAllNoticeBoardDetail = asyncHandler(async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch total records count for calculating total pages
    const totalRecords = await NoticeBoardModel.count();

    // Fetch paginated records from the NoticeBoard table
    const noticeboard = await NoticeBoardModel.findAll({
      limit: limit,
      offset: offset,
    });

    // Check if any data exists
    if (noticeboard.length > 0) {
      const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages

      res.status(200).json({
        status: true,
        message: "Data Found",
        data: noticeboard,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalRecords: totalRecords,
          limit: limit,
        },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No Data Found",
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


// Add a new document
exports.addDocument = asyncHandler(async (req, res) => {
  const { title, document_type, document_link,thumbnails } = req.body;

  try {
    const newDocument = await NoticeBoardModel.create({ 
      title, 
      document_type, 
      document_link ,thumbnails
    });

    res.status(201).json({
      status: true,
      message: "Document added successfully",
      data: newDocument,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error adding document",
      error: error.message,
    });
  }
});

// Get a single document by ID
exports.getSingleDocumentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const document = await NoticeBoardModel.findByPk(id);

    if (document) {
      res.status(200).json({
        status: true,
        message: "Document found",
        data: document,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Document not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching document",
      error: error.message,
    });
  }
});

// Update an existing document
exports.updateDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, document_type, document_link,thumbnails } = req.body;

  try {
    const document = await NoticeBoardModel.findByPk(id);

    if (document) {
      document.title = title;
      document.document_type = document_type;
      document.document_link = document_link;
      document.thumbnails = thumbnails;
      await document.save();

      res.status(200).json({
        status: true,
        message: "Document updated successfully",
        data: document,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Document not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating document",
      error: error.message,
    });
  }
});