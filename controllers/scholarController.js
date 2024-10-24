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
      // const formattedData = scholar_detail.map((item) => ({
      //   sch_short_nm: item.SCHOOL_SHORT_NAME, // from request data
      //   mobile_no: item.MOBILE_NUMBER, // from request data
      //   scholar_no: item.STUDENT_ID, // from request data
      //   name: item.STUDENT_NAME, // from request data
      //   scholar_dob: item.STUDENT_DOB, // from request data
      //   scholar_email: item.STUDENT_EMAIL, // from request data
        
      //   // Optionally add fields for scholar_type or scholar_otp
      // }));

      // const formattedData = scholar_detail.map((item) => {
      //   let scholarType;
      
      //   // Check if scholar_no is a number, text, or empty
      //   if (!item.STUDENT_ID) {
      //     scholarType = "TEACHER"; // Empty case
      //   } else if (isNaN(item.STUDENT_ID)) {
      //     scholarType = item.STUDENT_ID; // Text case
      //   } else {
      //     scholarType = "STUDENT"; // Number case
      //   }
      
      //   return {
      //     sch_short_nm: item.SCHOOL_SHORT_NAME, // from request data
      //     mobile_no: item.MOBILE_NUMBER, // from request data
      //     scholar_no: item.STUDENT_ID, // from request data
      //     name: item.STUDENT_NAME, // from request data
      //     scholar_dob: item.STUDENT_DOB, // from request data
      //     scholar_email: item.STUDENT_EMAIL, // from request data
      //     scholar_type: scholarType, // Assigning the scholar_type based on the condition
      //     // Optionally add fields for scholar_otp
      //   };
      // });
      const formattedData = scholar_detail.map((item) => {
        let scholarType;
        let scholarNo = item.STUDENT_ID; // Use the provided STUDENT_ID by default
      
        // Check and assign scholarType based on STUDENT_ID
        if (!item.STUDENT_ID) {
          scholarType = "TEACHER"; // Empty case
          // Generate an 8-digit random dummy number if STUDENT_ID is not available
          scholarNo = Math.floor(10000000 + Math.random() * 90000000); 
        } else if (isNaN(item.STUDENT_ID)) {
          scholarType = item.STUDENT_ID; // Text case
        } else {
          scholarType = "STUDENT"; // Number case
        }
      
        return {
          sch_short_nm: item.SCHOOL_SHORT_NAME, // from request data
          mobile_no: item.MOBILE_NUMBER, // from request data
          scholar_no: scholarNo, // Use either provided or generated scholar number
          name: item.STUDENT_NAME, // from request data
          scholar_dob: item.STUDENT_DOB, // from request data
          scholar_email: item.STUDENT_EMAIL, // from request data
          scholar_type: scholarType, // Assigning the scholar_type based on the condition
          // Optionally add fields for scholar_otp
        };
      });
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
              student_name:item?.name,
              scholar_no: item.scholar_no,
              is_verified: 1,
              sch_short_nm:item.sch_short_nm,
              scholar_dob:item.scholar_dob,
              scholar_email:item.scholar_email,
              scholar_type:item.scholar_type
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
       
      });

      
      if (existingStudenRecord) {
        const existingMobileNumbers = existingStudenRecord.student_family_mobile_number
        ? existingStudenRecord.student_family_mobile_number.split(',') // Assuming it's stored as a comma-separated string
        : [];

      if (!existingMobileNumbers.includes(item.mobile_no)) {
        
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
        student_dob:item.scholar_dob,
              student_email:item.scholar_email,
              scholar_type:item.scholar_type,
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
//BY Active User
exports.get_full_list_app_active_users_list = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Extract filter parameters from the query
    const isActive = req.query.active; // '1' for active, '0' for inactive, 'all' for no filter
    const isVerified = req.query.otpVerified; // '1' for verified, '0' for not verified, 'all' for no filter

    // Create an object for the 'where' clause
    let whereClause = {};
    
    // Apply filters based on the query parameters
    if (isActive === '1') {
      whereClause.active_by = 1; // Active users only
    } else if (isActive === '0') {
      whereClause.active_by = 0; // Inactive users only
    }
    
    if (isVerified === '1') {
      whereClause.is_verified = 1; // OTP verified
    } else if (isVerified === '0') {
      whereClause.is_verified = 0; // OTP not verified
    }

    // Fetch records with pagination and filtering
    const scholar_detail = await parentModel.findAll({
      where: whereClause,
      order: [
        ["parents_id", "DESC"], // Replace 'parents_id' with the column you want to sort by
      ],
      limit: limit,
      offset: offset,
    });

    // Fetch the total count of records
    const totalCount = await parentModel.count({ where: whereClause }); // Get total count of records for pagination

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

// 100% working above created for filter 
// exports.get_full_list_app_active_users_list = asyncHandler(async (req, res) => {
//   try {
//     // Extract pagination parameters from the query
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
//     const offset = (page - 1) * limit; // Calculate the offset for pagination

//     // Fetch records with pagination
//     const scholar_detail = await parentModel.findAll({
//       where: {
//         active_by: 1, // Add condition for active_by
//       },
//       order: [
//         ["parents_id", "DESC"], // Replace 'scholar_data_id' with the column you want to sort by
//       ],
//       limit: limit,
//       offset: offset,
//     });

//     // Fetch the total count of records
//     const totalCount = await parentModel.count({  where: {
//       active_by: 1, // Add condition for active_by
//     }}); // Get total count of records for pagination

//     // Check if any data exists
//     if (scholar_detail.length > 0) {
//       res.status(200).json({
//         status: true,
//         message: "Data_Found",
//         data: scholar_detail,
//         totalCount: totalCount, // Include total count in the response
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         message: "No_Data_Found",
//         data: null,
//         totalCount: 0, // Return total count as 0 if no data found
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


//ye parent main ki api heee
exports.getscholarDetail = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const scholar_detail = await parentModel.findAll({
      order: [
        ["parents_id", "DESC"], // Replace 'scholar_data_id' with the column you want to sort by
      ],
      limit: limit,
      offset: offset,
    });

    // Fetch the total count of records
    const totalCount = await parentModel.count(); // Get total count of records for pagination

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
exports.getlist_main_student_detail = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit; // Calculate the offset for pagination

    // Fetch records with pagination
    const student_main_detail = await student_main_detailModel.findAll({
      order: [
        ["student_main_id", "DESC"], // Sort by student_main_id in descending order
      ],
      limit: limit,
      offset: offset,
    });

    // Fetch the total count of records
    const totalCount = await student_main_detailModel.count(); // Get total count of records for pagination

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages; // Check if there are more pages

    // Check if any data exists
    if (student_main_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data Found",
        data: student_main_detail,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: totalCount,
          hasMore: hasMore, // Indicates if more data is available
        },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "No Data Found",
        data: [],
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: totalCount,
          hasMore: false, // No more data available if none is found
        },
      });
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching student details:", error.message);

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


exports.get_MainList_ScholarDetail_DropDown = asyncHandler(async (req, res) => {
  try {
   
    const scholar_main_detail = await student_main_detailModel.findAll({
    attributes: ['student_main_id','student_family_mobile_number'],
      order: [
        ["student_main_id", "DESC"], // Replace 'scholar_data_id' with the column you want to sort by
      ],
     
    });

    // Fetch the total count of records
    const totalCount = await student_main_detailModel.count(); // Get total count of records for pagination

    // Check if any data exists
    if (scholar_main_detail.length > 0) {
      res.status(200).json({
        status: true,
        message: "Data_Found",
        data: scholar_main_detail,
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