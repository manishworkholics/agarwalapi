const db = require("../config/db.config");
const adminModel = require("../models/adminModel.js");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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
    } = req.body;

    const newAdmin = await adminModel.create({
      full_name,
      adminuser_name,
      admin_password,
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

exports.updatePassword = asyncHandler(async (req, res) => {
  try {
    const { admin_id, old_password, new_password } = req.body;

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
      { admin_password: new_password }, // Update password
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
      parent_admin_id,
    } = req.body; // Get the admin details from the request body

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
        is_active: is_active,
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
    const allAdmin = await adminModel.findAll({});

    if (allAdmin.length > 0) {
      res.status(200).json({
        status: true,
        message: "Admin Found",
        data: allAdmin,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No Data Found",
        data: allAdmin,
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching appScrollerMsg  details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "Error  admin record",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

exports.getSingleAdmin = asyncHandler(async (req, res) => {
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
