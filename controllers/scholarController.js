const asyncHandler = require("express-async-handler");
const scholarModel = require("../models/ScholarModel");
const parentModel = require("../models/parentModel");
const student_main_detailModel = require("../models/studentModel");
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');

exports.insertScholarRecord = asyncHandler(async (req, res) => {
  try {
    // Get the array of records from request body
    const scholar_detail = req.body.data;

    if (scholar_detail.length > 0) {
      // Modify the data structure to match your Sequelize model fields
      const formattedData = scholar_detail.map((item) => ({
        sch_short_nm: item.SCHOOL_SHORT_NAME, // from request data
        mobile_no: item.MOBILE_NUMBER, // from request data
        scholar_no: item.STUDENT_ID, // from request data
        name: item.STUDENT_NAME, // from request data
        // Optionally add fields for scholar_type or scholar_otp
      }));

      // // Insert records into the database  ye sirf insert karagaa
      // await scholarModel.bulkCreate(formattedData, {
      //   ignoreDuplicates: true, // Optional: to avoid inserting duplicates
      // });

      //=======================================
      // Extract mobile numbers from the formatted data
      
      for (let i = 0; i < formattedData.length; i++) {
        const item = formattedData[i];

        // Step 2: Check if the current mobile number and scholar number exist
        const existingRecord = await parentModel.findOne({
          where: {
            mobile_no: item.mobile_no,
            scholar_no: item.scholar_no,
            
          },
          attributes: ["mobile_no", "scholar_no"], // Fetch the existing records
        });

        // Step 3: If the record does not exist, insert it
        //  ==================this is for which just maatch scholar and mobile then insert onmy ======================
        if (!existingRecord) {
          await parentModel.create(
            {
              mobile_no: item.mobile_no,
              scholar_no: item.scholar_no,
              is_verified: 1,
              sch_short_nm:item.sch_short_nm
            },
            {
              ignoreDuplicates: true, // Optional: to avoid inserting duplicates
            }
          );
          console.log(
            `Inserted new record for mobile: ${item.mobile_no}, scholar: ${item.scholar_no}`
          );

          // Step 4: Return a success response
          // res.status(200).json({
          //   status: true,
          //   message: "Inserted new record for mobile",
          // });
        } else {
          console.log(
            `Record already exists for mobile: ${item.mobile_no}, scholar: ${item.scholar_no}`
          );

          // res.status(200).json({
          //   status: true,
          //   message: "Record already exists for mobile.",
          // });
        }

      //  ==========  student_main_detail  ========this is for insert to student with match only scholar number and and if mobile is diffrent and scholar is same then just insert into database which has same number ======================
      let mobileNumbersToInsert = [];
      const existingStudenRecord = await student_main_detailModel.findOne({
        where: {
          student_number: item.scholar_no,
        },
        // attributes: ['student_number', 'student_family_mobile_number'],  // Fetch the existing records
      });

      
      if (existingStudenRecord) {
        const existingMobileNumbers = existingStudenRecord.student_family_mobile_number
        ? existingStudenRecord.student_family_mobile_number.split(',') // Assuming it's stored as a comma-separated string
        : [];

      if (!existingMobileNumbers.includes(item.mobile_no)) {
        // If the mobile number is not found, push it into the array for later insertion
        // mobileNumbersToInsert.push(item.mobile_no);
      
        // const rec+to_update=
        // await student_main_detailModel.update(
        //   { student_family_mobile_number: existingMobileNumbers.join(',') }, // Join the array to save it as a string
        //   { where: { student_number: item.scholar_no } } // Update the correct student record
        // );
        const existingMobileNumbers = existingStudenRecord.student_family_mobile_number || ''; // Handle null case

        // Combine old mobile numbers with the new mobile number
        const mobileNumbersArray = existingMobileNumbers.split(','); // Split existing numbers into an array

        // Add the new mobile number if it's not already present
        if (!mobileNumbersArray.includes(item.mobile_no)) {
          mobileNumbersArray.push(item.mobile_no); // Add new number to array
        }

        // Step 3: Update the student record with combined mobile numbers
        await student_main_detailModel.update(
          {
            student_family_mobile_number: mobileNumbersArray.join(','), // Join the array back to a string
          },
          {
            where: { student_main_id: existingStudenRecord.student_main_id }, // Update based on scholar number
          }
        );
      
      }
      }
    else {
      const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
      
      // If student_number does not exist, insert the student details
      await student_main_detailModel.create({
        color:color,
        student_number: item.scholar_no,
        student_name: item.name,
        student_family_mobile_number: item.mobile_no, // Insert new mobile number
        createdAt: new Date(),
      });
    }

      //==========  student_main_detail=======================================
      }
      //=======================================
     

      res.status(200).json({
        status: true,
        message: "Records inserted successfully",
        data: formattedData, // Return formatted data as confirmation
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.error("Error inserting scholar records:", error.message);
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

exports.getscholarDetail = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const scholar_detail = await scholarModel.findAll({
      order: [
        ["scholar_data_id", "DESC"], // Replace 'scholar_data_id' with the column you want to sort by
      ],
      limit: limit,
      offset: offset,
    });

    // Fetch the total count of records
    const totalCount = await scholarModel.count(); // Get total count of records for pagination

    // Check if any data exists
    if (scholar_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: scholar_detail,
        totalCount: totalCount, // Include total count in the response
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No_Data_Found",
        data: null,
        totalCount: 0, // Return total count as 0 if no data found
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching scholar details:", error.message);

    // Send an error response to the client
    res.status(500).json({
      status: false,
      message: "An error occurred",
      error: error.message, // Return the error message for debugging (optional)
    });
  }
});

// exports.getscholarDetail = asyncHandler(async (req, res) => {
//   try {
//     // Extract pagination parameters from the query
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
//     const offset = (page - 1) * limit; // Calculate the offset for pagination

//     // Fetch records with pagination
//     const scholar_detail = await scholarModel.findAll({
//       order: [
//         ["scholar_data_id", "DESC"], // Replace 'scholar_data_id' with the column you want to sort by
//       ],
//       limit: limit,
//       offset: offset,
//     });

//     // Fetch the total count of records
//     const totalCount = await scholarModel.count(); // Get total count of records for pagination

//     // Calculate total pages
//     const totalPages = Math.ceil(totalCount / limit); // Calculate total pages based on count and limit

//     // Check if any data exists
//     if (scholar_detail.length > 0) {
//       res.status(200).json({
//         status: true,
//         message: "Data Found",
//         data: scholar_detail,
//         totalCount: totalCount, // Include total count in the response
//         pagination: {
//           currentPage: page,
//           totalPages: totalPages,
//           limit: limit,
//         },
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         message: "No Data Found",
//         data: null,
//         totalCount: 0, // Return total count as 0 if no data found
//         pagination: {
//           currentPage: page,
//           totalPages: 0, // No pages if no data is found
//           limit: limit,
//         },
//       });
//     }
//   } catch (error) {
//     // Log the error to the console for debugging
//     console.error("Error fetching scholar details:", error.message);

//     // Send an error response to the client
//     res.status(500).json({
//       status: false,
//       message: "An error occurred",
//       error: error.message, // Return the error message for debugging (optional)
//     });
//   }
// });


// exports.getscholarDetail = asyncHandler(async (req, res) => {
//   try {
//     // Fetch all records from the NoticeBoard table
//     const scholar_detail = await scholarModel.findAll({
//       order: [
//         ["scholar_data_id", "DESC"], // Replace 'createdAt' with the column you want to sort by
//       ],
//     });

//     // Check if any data exists
//     if (scholar_detail.length > 0) {
//       res.status(200).json({
//         status: true,
//         message: "Data_Found",
//         data: scholar_detail,
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         message: "No_Data_Found",
//         data: null,
//       });
//     }
//   } catch (error) {
//     // Log the error to the console for debugging
//     console.error("Error fetching scholar  details:", error.message);

//     // Send an error response to the client
//     res.status(500).json({
//       status: false,
//       message: "An error occurred",
//       error: error.message, // Return the error message for debugging (optional)
//     });
//   }
// });
