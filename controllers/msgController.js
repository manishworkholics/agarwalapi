const asyncHandler = require("express-async-handler");
const appScrollerModel = require("../models/appScrollerMsgModel"); 
const welcomeModel = require("../models/welcomeMsgModel"); 
const CategoryModel = require("../models/categoryModel"); 
// const GroupModel = require("../models/msgGroupModel"); 
// const SubGroupModel = require("../models/msgSubGroupModel"); 
const { groupModel, subGroupModel } = require('../models/associations');

const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";




  exports.getSubGroupData = asyncHandler(async (req, res) => {
    try {
      const subGroups = await subGroupModel.findAll({
        include: [{
          model: groupModel,
          attributes: ['msg_group_id', 'msg_group_name'], // Select relevant fields from group
        }],
      });
  
      res.status(200).json({
        status: 'success',
        data: subGroups,
      });
    } catch (error) {
      console.error('Error fetching subgroups with groups:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message,
      });
    }
  });