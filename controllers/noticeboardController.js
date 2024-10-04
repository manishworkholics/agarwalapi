
const asyncHandler = require("express-async-handler");
const NoticeBoardModel = require("../models/noticeBoardModel.js"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');



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

// Add a new document
exports.addDocument = asyncHandler(async (req, res) => {
  const { title, document_type, document_link } = req.body;

  try {
    const newDocument = await NoticeBoardModel.create({ 
      title, 
      document_type, 
      document_link 
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
  const { title, document_type, document_link } = req.body;

  try {
    const document = await NoticeBoardModel.findByPk(id);

    if (document) {
      document.title = title;
      document.document_type = document_type;
      document.document_link = document_link;
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