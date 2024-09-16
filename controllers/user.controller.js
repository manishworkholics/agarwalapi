const express = require('express');
const router = express.Router();
const db = require('../config/db.config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// SignUp function
exports.signUp = async (req, res) => {
   try {

   } catch (error) {

   }
};

// Login function
exports.login = async (req, res) => {
   try {

   } catch (error) {

   }
};

exports.generateOtp = async (req, res) => {
   const { mobile_no } = req.body;

   if (!mobile_no) {
      return res.status(400).json({ error: 'Mobile number is required' });
   }


   const otp = crypto.randomInt(100000, 999999).toString();
   const otpCreated = new Date();


   const queryCheck = 'SELECT * FROM app_user_reg WHERE mobile_no = ?';
   db.query(queryCheck, [mobile_no], (err, results) => {
      if (err) {
         return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {

         const queryUpdate = `UPDATE app_user_reg SET otp = ?, otp_datetime = ? WHERE mobile_no = ?`;
         db.query(queryUpdate, [otp, otpCreated, mobile_no], (err, results) => {
            if (err) {
               return res.status(500).json({ error: 'Failed to update OTP' });
            }

            res.status(200).json({ message: 'OTP sent successfully',otp:otp });
         });
      } else {

         const queryInsert = `INSERT INTO app_user_reg (mobile_no, otp, otp_datetime) VALUES (?, ?, ?)`;
         db.query(queryInsert, [mobile_no, otp, otpCreated], (err, results) => {
            if (err) {
               return res.status(500).json({ error: 'Failed to store OTP' });
            }

            res.status(200).json({ message: 'OTP sent successfully' });
         });
      }
   });
};

// exports.getusers = async (req, res) => {
//     try {
//         const query = 'SELECT * FROM users';  // Replace 'users' with your table name
//         db.query(query, (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err });
//             }
//             res.status(200).json(results);
//         });
//     } catch (error) {

//     }
// }
