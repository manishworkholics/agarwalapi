const db = require('../config/db.config');
const schoolModel = require("../models/schoolMasterModel"); 
const { Sequelize } = require('sequelize');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');

// Function to create a new school
exports.createSchool = asyncHandler(async (req, res) => {
  try {
    // Extract data from the request body
    const {
      sch_nm,
      sch_short_nm,
      is_active,
      entry_date, // this will be set to current date if not provided
      entry_by,
      
      scroll_news_text,
      def_msg_ids,
      text_color,
      bg_color,
      address,
      contact_no,
      website,
      email_id,
      logo_img,
      session,
      season,
      mail_email_id
    } = req.body;

    // Set entry_date to current date if not provided
    const currentDate = new Date(); // Get current date and time
    const finalEntryDate = entry_date ? new Date(entry_date) : currentDate;

    // Create a new school record
    const newSchool = await schoolModel.create({
      sch_nm,
      sch_short_nm,
      is_active,
      entry_date: finalEntryDate,
      entry_by,    
      scroll_news_text,
      def_msg_ids,
      text_color,
      bg_color,
      address,
      contact_no,
      website,
      email_id,
      logo_img,
      session,
      season,
      mail_email_id
    });

    // Respond with the created school record
    res.status(201).json({
      status: true,
      message: "School created successfully",
      data: newSchool
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error creating school:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message // Return the error message for debugging (optional)
    });
  }
});

// Get All School
exports.getSchool = asyncHandler(async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch total records count for calculating total pages
    const totalRecords = await schoolModel.count({where:{is_deleted: 0}});

    // Fetch paginated records from the schoolModel
    const school_detail = await schoolModel.findAll({
       where: { is_deleted: 0 },
       limit: limit,
      offset: offset,
    });

    // Check if any data exists
    if (school_detail.length > 0) {
      const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages

      res.status(200).json({
        status: true,
        message: "Data Found",
        data: school_detail,
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
    console.error("Error fetching school details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});


   exports.getSingleSchool = asyncHandler(async (req, res) => {
  try {
    // Extract sch_id from request parameters
    const { id } = req.params;

    // Find the school by ID
    const schoolDetail = await schoolModel.findOne({
      where: { sch_id: id } // Use the sch_id to query the database
    });

    if (schoolDetail) {
      res.status(200).json({
        status: true,
        message: "Data Found",
        data: schoolDetail
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No Data Found",
        data: null
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching school details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message // Return the error message for debugging (optional)
    });
  }
});


// Function to update a school by its ID
exports.updateSchool = asyncHandler(async (req, res) => {
  try {
    // Extract sch_id from request parameters
    const { id } = req.params;

    // Find the school by ID
    const schoolDetail = await schoolModel.findOne({
      where: { sch_id: id } // Use the sch_id to query the database
    });

    if (!schoolDetail) {
      return res.status(404).json({
        status: false,
        message: "School not found",
        data: null
      });
    }

    // Extract data from the request body
    const {
      sch_nm,
      sch_short_nm,
      is_active,
      
      edit_by,   // Ensure edit_by is provided
      scroll_news_text,
      def_msg_ids,
      text_color,
      bg_color,
      address,
      contact_no,
      website,
      email_id,
      logo_img,
      session,
      season,
      mail_email_id
    } = req.body;
// Set edit_date to the current date if not provided
const edit_date = new Date(); // Default to current date and time

    // Update the school record
    await schoolModel.update(
      {
        sch_nm,
        sch_short_nm,
        is_active,
        edit_date: edit_date, // Ensure edit_date is in Date format
        edit_by,
        scroll_news_text,
        def_msg_ids,
        text_color,
        bg_color,
        address,
        contact_no,
        website,
        email_id,
        logo_img,
        session,
        season,
        mail_email_id
      },
      {
        where: { sch_id: id } // Identify the record to update
      }
    );

    // Respond with the updated school record
    res.status(200).json({
      status: true,
      message: "School updated successfully",
      data: {
        sch_id: id,
        sch_nm,
        sch_short_nm,
        is_active,
        edit_date: new Date(edit_date), // Include updated edit_date
        edit_by,
        scroll_news_text,
        def_msg_ids,
        text_color,
        bg_color,
        address,
        contact_no,
        website,
        email_id,
        logo_img,
        session,
        season,
        mail_email_id
      }
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error updating school:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message // Return the error message for debugging (optional)
    });
  }
});

exports.deleteSchool = asyncHandler(async (req, res) => {
  try {
    // Extract sch_id from request parameters
    const { id } = req.params;

    // Find the school by ID
    const schoolDetail = await schoolModel.findOne({
      where: { sch_id: id } // Use the sch_id to query the database
    });

    if (!schoolDetail) {
      return res.status(404).json({
        status: false,
        message: "School not found",
        data: null
      });
    }

    // Toggle the is_active status (1 to 0 or 0 to 1)
    const newStatus = schoolDetail.is_deleted === 1 ? 0 : 1;

    // Update only the is_deleted field
    await schoolModel.update(
      {
        is_deleted: newStatus,
        edit_date: new Date(), // Update the edit_date
      },
      {
        where: { sch_id: id }
      }
    );

    // Respond with the updated status
    res.status(200).json({
      status: true,
      message: `School status updated to ${newStatus === 1 ? "active" : "inactive"}`,
      data: {
        sch_id: id,
        is_deleted: newStatus,
        edit_date: new Date()
      }
    });
  } catch (error) {
    console.error("Error updating school status:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message // Return the error message for debugging (optional)
    });
  }
});

exports.getSearch_school_Detail = asyncHandler(async (req, res) => {
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

    // Set up the where clause for searching by school name (sch_nm)
    const whereClause = {};

    if (searchquery) {
      whereClause[Sequelize.Op.and] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('sch_nm')), {
          [Sequelize.Op.like]: `%${searchquery.toLowerCase()}%`, // Case-insensitive search on school name
        }),
      ];
    }

    // Fetch the total number of matching records (for pagination)
    const totalRecords = await schoolModel.count({
      where: whereClause,
    });

    // Fetch the paginated records that match the search query by sch_nm
    const schoolRecords = await schoolModel.findAll({
      where: whereClause, // Apply search query filter
      limit: parseInt(limit), // Limit the number of results per page
      offset: parseInt(offset), // Skip records for pagination
      order: [['sch_id', 'DESC']], // Order by school ID in descending order
    });

    // Return the results
    if (schoolRecords.length === 0) {
      return res.status(200).json({
        status: false,
        length: 0,
        message: "No schools found",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      length: schoolRecords.length,
      totalRecords, // Include the total number of matching records
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / limit), // Calculate total pages
      message: "Schools found",
      data: schoolRecords,
    });

  } catch (error) {
    console.error("Error fetching schools:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});


