const db = require("../config/db.config");
 const adminModel = require("../models/adminModel.js");
const bcrypt = require('bcrypt');

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const MAIN_URL = process.env.MAIN_URL;
const { generateToken } = require('../middlewares/jwtUtils');
// const {
//   ChatMessage,msgMasterModel,adminModel,schoolModel,
//   groupModel,
//   subGroupModel,    
//   msgBodyModel,sendedMsgModel,
//   studentMainDetailModel,feesDisplayModel
// } = require("../models/associations");



exports.videoUpload = asyncHandler(async (req, res, next) => {
  try {
    const Url = MAIN_URL + "Uploads/video/" + req.file.filename;
    const filename = req.file.filename;
    res.status(200).json({
      status: "success",
      message: "Created Successfully",
      filename: filename,
      url: Url,
    });
  } catch (error) {
    next(appErr(error.message));
  }
});


exports.imageUpload = asyncHandler(async (req, res, next) => {
  try {
    const Url = process.env.MAIN_URL + "Uploads/image/" + req.file.filename;
    const filename = req.file.filename;

    res.status(200).json({
      status: "success",
      message: "Created Successfully",
      imagename: filename,
      url: Url,
    });
  } catch (error) {
    next(appErr(error.message));
  }
});

exports.pdfUpload = asyncHandler(async (req, res, next) => {
  try {
    const Url = process.env.MAIN_URL + "Uploads/pdf/" + req.file.filename;
    const filename = req.file.filename;

    res.status(200).json({
      status: "success",
      message: "Created Successfully",
      imagename: filename,
      url: Url,
    });
  } catch (error) {
    next(appErr(error.message));
  }
});

exports.createAdmin = asyncHandler(async (req, res) => {
  try {
    const {
      full_name,
      adminuser_name,
      admin_password,
      is_active,
      admin_type,
      mobile_no,
      added_admin_id,
      parent_admin_id,
      school_id
    } = req.body;

 const schoolIdsString = school_id.join(','); // Convert array to string "1,2,3"
   
    // Check if the username already exists
    const existingUser = await adminModel.findOne({
      where: { adminuser_name }
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Username already exists. Please choose another username.",
      });
    }

    // Check if the mobile number already exists
    const existingMobile = await adminModel.findOne({
      where: { mobile_no }
    });

    if (existingMobile) {
      return res.status(400).json({
        status: false,
        message: "Mobile number already exists. Please use another mobile number.",
      });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(admin_password, salt);

    // Create the new admin record
    const newAdmin = await adminModel.create({
      full_name,
      adminuser_name,
      admin_password,
      admin_password_encrypted: hashedPassword, // Save the hashed password
      school_id:schoolIdsString,
      is_active,
      admin_type,
      mobile_no,
      added_date: new Date(),
      added_admin_id,
      parent_admin_id,
    });

    
    res.status(200).json({
      status: true,
      message: "New admin created successfully",
      data: newAdmin,
    });

  } catch (error) {
    console.error("Error creating new admin:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error inserting admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.loginAdmin = asyncHandler(async (req, res) => {
  const { adminuser_name, admin_password } = req.body;

  try {
    // Find user by username
    const user = await adminModel.findOne({ where: { adminuser_name: adminuser_name } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(admin_password, user.admin_password_encrypted);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  // ================  Token end   ==============================
    const tokenuser = {
      id: user?.admin_id,  // Replace with actual user ID
      role: 'Admin', // Replace with actual role
  };

  // Generate token using the utility function
  const token = generateToken(tokenuser);
  // ===================   Token end   ==============================
    // Successful login, proceed further (e.g., generate token, send response)
    res.status(200).json({ message: 'Login successful', admin_id: user.admin_id,token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


exports.updatePassword = asyncHandler(async (req, res) => {
  try {
    const { admin_id, old_password, new_password } = req.body;
// Hash the password before saving
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(new_password, salt);

    // Step 1: Find the admin by admin_id
    const admin = await adminModel.findOne({
      where: { admin_id: admin_id },
    });

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    // Step 2: Check if the old password matches the stored password
    if (admin.admin_password !== old_password) {
      return res.status(400).json({
        status: false,
        message: "Old password is incorrect",
      });
    }

    // Step 3: Update the password with the new one
    await adminModel.update(
      { admin_password: new_password,admin_password_encrypted:hashedPassword }, // Update password
      { where: { admin_id: admin_id } } // Match by admin_id
    );

    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching appScrollerMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error Updating admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.updateProfileDetail = asyncHandler(async (req, res) => {
  try {
    const { admin_id } = req.params; // Get the admin_id from the route parameter
    const {
      full_name,
      adminuser_name,
      admin_password,
      is_active,
      admin_type,
      mobile_no,
      added_admin_id,
      parent_admin_id,school_id,
    } = req.body; // Get the admin details from the request body
// Hash the password before saving
const schoolIdsString = school_id.join(','); // Convert array to string "1,2,3"
   
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(admin_password, salt);

    // Step 1: Find the admin by admin_id
    const admin = await adminModel.findOne({
      where: { admin_id: admin_id },
    });

    // Step 2: Check if the admin exists
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    // Step 3: Update the admin details
    await adminModel.update(
      {
        full_name: full_name,
        adminuser_name: adminuser_name,
        admin_password: admin_password,
        admin_password_encrypted:hashedPassword,
        is_active: is_active,school_id:schoolIdsString,
        admin_type: admin_type,
        mobile_no: mobile_no,
        added_admin_id: added_admin_id,
        parent_admin_id: parent_admin_id,
      },
      { where: { admin_id: admin_id } } // Match by admin_id
    );

    return res.status(200).json({
      status: true,
      message: "Admin details updated successfully",
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching appScrollerMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error Updating admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.getAllAdmin = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const allAdmin = await adminModel.findAll({
      where: { is_deleted: 0 }, limit: limit,  // Apply limit for pagination
      offset: offset, // Apply offset for pagination
      order: [['admin_id', 'DESC']], 
    });

    // Fetch the total count of records
    const totalCount = await adminModel.count({
      where: { is_deleted: 0 }, // Count only non-deleted records
    }); // Get total count of records for pagination

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

    // Check if any data exists
    if (allAdmin.length > 0) {
      res.status(200).json({
        status: true,
        message: "Admin Found",
        data: allAdmin,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          limit: limit,
        },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No Data Found",
        data: allAdmin,
        pagination: {
          currentPage: page,
          totalPages: 0, // No pages if no data is found
          limit: limit,
        },
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching admin details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error fetching admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.getSingleAdmin = asyncHandler(async (req, res) => {
  try {
    const adminId = req.params.id;

    const singleAdmin = await adminModel.findOne({
      where: { admin_id: adminId },
      // include: [
      //   {
      //     model: schoolModel,
      //     as: 'schools', // Alias defined in the association
      //     // attributes: ['sch_id', 'sch_name'], // Specify the fields to retrieve
      //   },
      // ],
    });

    if (singleAdmin) {
      res.status(200).json({
        status: true,
        message: "Data Found",
        data: singleAdmin,
        length: singleAdmin.length,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No DataFound",
        data: singleAdmin,
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching appScrollerMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error inserting admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.updatePasswordAdmin = asyncHandler(async (req, res) => {
  try {
    const adminId = req.params.id;

    const singleAdmin = await adminModel.findOne({
      where: { admin_id: adminId },
    });

    if (singleAdmin) {
      res.status(200).json({
        status: true,
        message: "Data Found",
        data: singleAdmin,
        length: singleAdmin.length,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No DataFound",
        data: singleAdmin,
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching appScrollerMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error inserting admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});


exports.deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Extract admin ID from request parameters

    // Find the admin by ID
    const adminDetail = await adminModel.findOne({
      where: { admin_id: id } // Use the admin_id to query the database
    });

    if (!adminDetail) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
        data: null
      });
    }

    // Toggle the is_deleted status (1 to 0 or 0 to 1)
    const newStatus = adminDetail.is_deleted === 1 ? 0 : 1;

    // Update only the is_deleted field
    await adminModel.update(
      {
        is_deleted: newStatus,
        edit_date: new Date(), // Update the edit_date
      },
      {
        where: { admin_id: id }
      }
    );

    // Respond with the updated status
    res.status(200).json({
      status: true,
      message: `Admin status updated to ${newStatus === 1 ? "deleted" : "active"}`,
      data: {
        admin_id: id,
        is_deleted: newStatus,
        edit_date: new Date()
      }
    });
  } catch (error) {
    console.error("Error updating admin status:", error.message);

    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message // Return the error message for debugging (optional)
    });
  }
});

