const asyncHandler = require("express-async-handler");
const appScrollerModel = require("../models/appScrollerMsgModel"); 
const welcomeModel = require("../models/welcomeMsgModel"); 
const CategoryModel = require("../models/categoryModel"); 
const GroupModel = require("../models/msgGroupModel"); 
const SubGroupModel = require("../models/msgSubGroupModel"); 

const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";




  exports.getSubGroupData = asyncHandler(async (req, res) => {
    try {
      const subgroups = await subGroupModel.findAll({
        include: [
          {
            model: GroupModel,
           },
        ],
      });
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: subgroups,
      });

    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error fetching   details:", error.message);
  
      // Send an error response to the client
      res.status(500).json({
        status: false,
        message: "An error occurred",
        error: error.message, // Return the error message for debugging (optional)
      });
    }
  });