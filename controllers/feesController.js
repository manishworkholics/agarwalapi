
const asyncHandler = require("express-async-handler");
// const feesDisplayModel = require("../models/feesModel"); 
const studentMainModel = require("../models/studentModel");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');
const { Op } = require('sequelize');

const {
    // groupModel,
    // subGroupModel,
    // msgMasterModel,
    // msgBodyModel,sendedMsgModel,
    studentMainDetailModel,feesDisplayModel
  } = require("../models/associations");

exports.getallfeesDisplayDetail = asyncHandler(async (req, res) => {
    try {
      // Get the current page and limit from query parameters (with default values)
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page if not provided
      const offset = (page - 1) * limit; // Calculate offset for pagination
  
      // Fetch paginated records from the feesDisplayModel table
      const { count, rows: feesDisplay_detail } = await feesDisplayModel.findAndCountAll({
        limit,
        offset,
      });
  
      // Check if any data exists
      if (feesDisplay_detail.length > 0) {
        res.status(200).json({
          status: true,
          message: "Data_Found",
          data: feesDisplay_detail,
          pagination: {
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            pageSize: limit,
          },
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
      console.error("Error fetching feesDisplay details:", error.message);
  
      // Send an error response to the client
      res.status(500).json({
        status: false,
        message: "An error occurred",
        error: error.message, // Return the error message for debugging (optional)
      });
    }
  });

  //   This api is for only mobile
  exports.getFeesDetailByMobile = asyncHandler(async (req, res) => {
    try {
        const { mobilenumber } = req.query;
      if (!mobilenumber) {
        return res.status(200).json({
          status: false,
          message: "Mobile numbers are required",
        });
      }// Fetch all records from the feesDisplayModel table without pagination
      
        // Trim the mobile number to remove any whitespace
    const mobileNumber = mobilenumber.trim();

     // Use Sequelize's Op.like to check for the matching number in a comma-separated field
     const relatedProfiles = await studentMainDetailModel.findAll({
        where: {
          student_family_mobile_number: {
            [Op.like]: `%${mobileNumber}%`, // Find rows where mobile_no contains the number
          },
        },
      });

      const studentNumbers = relatedProfiles.map(student => student.student_number);

      const allMatchingFees = await feesDisplayModel.findAll({
        where: {
          scholar_no: {
            [Op.in]: studentNumbers // Match scholar_no with any of the student numbers
          }
        },
        order: [
          ['fees_display_id', 'DESC'] // Sort by 'createdAt' in descending order (latest first)
        ],
        include: [
          {
            model: studentMainDetailModel, // Ensure this references your correct model
            as: 'student', // This must match the alias used in the association
            //attributes: ['student_name'] // Only select the student_name field
          }
        ]
      });

// Create a Map to store the latest unique entries
const uniqueFeesMap = new Map();

// Iterate over all matching fees and store the latest unique ones
allMatchingFees.forEach(fee => {
  // Check if the Map already has this scholar_no
  if (!uniqueFeesMap.has(fee.scholar_no)) {
    uniqueFeesMap.set(fee.scholar_no, fee); // Add to the map if it doesn't exist
  }
});

// Convert the Map values to an array
const uniqueScholarFees = Array.from(uniqueFeesMap.values());
      // Check if any data exists
      if (uniqueScholarFees.length > 0) {
        res.status(200).json({
          status: true,
          message: "Data_Found",
          data: uniqueScholarFees,
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
      console.error("Error fetching feesDisplay details:", error.message);
  
      // Send an error response to the client
      res.status(500).json({
        status: false,
        message: "An error occurred",
        error: error.message, // Return the error message for debugging (optional)
      });
    }
  });
  
  
  exports.getSingleFeesDisplayDetail = asyncHandler(async (req, res) => {
    try {
      // Extract the ID from request parameters
      const { id } = req.params;
  
      // Fetch the single record from the feesDisplayModel table using the ID
      const feesDisplay_detail = await feesDisplayModel.findOne({
        where: { fees_display_id: id }, // Replace 'fees_display_id' with your actual primary key field name
      });
  
      // Check if data exists for the given ID
      if (feesDisplay_detail) {
        res.status(200).json({
          status: true,
          message: "Data_Found",
          data: feesDisplay_detail,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "No_Data_Found",
          data: null,
        });
      }
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error fetching feesDisplay details:", error.message);
  
      // Send an error response to the client
      res.status(500).json({
        status: false,
        message: "An error occurred",
        error: error.message, // Return the error message for debugging (optional)
      });
    }
  });
  
// Add a new feesDisplay
exports.addfeesDisplay = asyncHandler(async (req, res) => {
   
  try {
   
    const scholar_detail = req.body.data;

    if (scholar_detail.length > 0) {
        // Modify the data structure to match your Sequelize model fields
        const formattedData = scholar_detail.map((item) => ({
          scholar_no: item.scholar_no,
          session_detail: item.session_detail, 
          term: item.term, 
          outstandingfees: item.outstandingfees,
          duedate: item.duedate,           
        }));

        for (let i = 0; i < formattedData.length; i++) {
            const item = formattedData[i];
        await feesDisplayModel.create(
                {
                  scholar_no: item.scholar_no,
                  session_detail: item.session_detail,
                  term: item.term,
                  outstandingfees:item.outstandingfees,
                  duedate: item.duedate,
                }
                
              );
          
          }
          }
       
    
          //==========  _detail=======================================
     
    res.status(201).json({
      status: true,
      message: "feesDisplay added successfully",
      
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error adding feesDisplay",
      error: error.message,
    });
  }
});

// Get a single feesDisplay by ID
exports.getSinglefeesDisplayDetail = asyncHandler(async (req, res) => {
  const { feesDisplayid } = req.params;

  try {
    const feesDisplay = await feesDisplayModel.findByPk(feesDisplayid);

    if (feesDisplay) {
      res.status(200).json({
        status: true,
        message: "feesDisplay found",
        data: feesDisplay,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "feesDisplay not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching feesDisplay",
      error: error.message,
    });
  }
});

// Update an existing feesDisplay
exports.updatefeesDisplay = asyncHandler(async (req, res) => {
  const { feesDisplayid } = req.params;
  const { title } = req.body;

  try {
    const feesDisplay = await feesDisplayModel.findByPk(feesDisplayid);

    if (feesDisplay) {
      feesDisplay.title = title;
      await feesDisplay.save();

      res.status(200).json({
        status: true,
        message: "feesDisplay updated successfully",
        data: feesDisplay,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "feesDisplay not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating feesDisplay",
      error: error.message,
    });
  }
});
