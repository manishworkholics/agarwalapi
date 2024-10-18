const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const ParentReg = require("../models/parentModel"); 
const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
// Secret key for signing JWT (use a secure key and store it in env variables)
const JWT_SECRET = process.env.JWT_SECRET ;
const { generateToken } = require('../middlewares/jwtUtils');
const axios = require('axios');
const https = require('https');

async function sendOTPToMobile (mobileNumber,otp) {
  // Validate the mobile number (10 digits assumed)
  if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
    return { status: false, message: 'Invalid mobile number' };
  }
 const message = `OTP for Login on app is ${otp}. Please do not share this with anyone for security reasons. `;
const apiUrl=`http://tagsolutions.in/sms-panel/api/http/index.php?username=APSCHOOL&apikey=E669B-455B0&apirequest=Text&sender=ACTIDR&mobile=${mobileNumber}&message=${message}.&route=TRANS&TemplateID=1407167332525147046&format=JSON`;
try {
   // Create an Axios instance that ignores SSL certificate validation
  
   const agent = new https.Agent({  
    rejectUnauthorized: false // Disable SSL certificate validation
  });

  // Make a POST request to the external API
  const response = await axios.post(apiUrl,{},{ httpsAgent: agent });

  if (response.data.status === 'success') {
    return { status: true, message: 'OTP sent successfully', mobileNumber, otp };
  } else {
    return { status: false, message: 'Failed to send OTP', error: response.data };
  }
} catch (error) {
  return { status: false, message: 'Error occurred while sending OTP', error: error.message };
} 

return { status: true, message: 'OTP sent successfully', mobileNumber, otp };
}
// SignUp function
exports.signUp = async (req, res) => {
  try {
    // Add your signup logic here using Sequelize
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    // Add your login logic here using Sequelize
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = asyncHandler(async (req, res) => {
  try {
   
  const { mobile_no } = req.body;

  if (!mobile_no) {
    return res
      .status(200)
      .json({ status: false, message: "Mobile number is required" });
  }

  
  // Check if mobile number exists
  const user = await ParentReg.findOne({ where: { mobile_no } });
  if (user) {
    let response ='';
    const now = new Date();
    // user.otp_datetime = now;
    await user.save();
    return res
      .status(200)
      .json({ status: true, message: "Logout Status update Successfully", });
  } else {
    // return res.status(200).json({ status: false, message: "User Not Exist" });
   return res.status(200).json({ status: false, message: "Detail not found"});

  }
} catch (error) {
  // Log the error to the console for debugging
  console.error("Error fetching page  details:", error.message);

  // Send an error response to the client
  res.status(500).json({
    status: false,
    message: "An error occurred",
    error: error.message, // Return the error message for debugging (optional)
  });
}  
});

// Generate OTP
exports.generateOtp = asyncHandler(async (req, res) => {
  const { mobile_no } = req.body;

  if (!mobile_no) {
    return res
      .status(200)
      .json({ status: false, message: "Mobile number is required" });
  }
  
  const otp = crypto.randomInt(1000, 10000).toString();
  
    const otpCreated = new Date();

  // Check if mobile number exists
  const user = await ParentReg.findOne({ where: { mobile_no } });
  
  if (user) {
    
    let response =null;
    // Sms Gateway start
  //  response = await sendOTPToMobile(mobile_no,otp);
  // Sms Gateway End
  
    // Update existing user's OTP
    user.otp = otp;
    user.otp_datetime = otpCreated;
    await user.save();
    return res
      .status(200)
      .json({ status: true, message: "OTP sent successfullyyy", otp ,response});
  } else {
     return res.status(200).json({ status: false, message: "User Not Exist" });
   
  //  const dta= await ParentReg.create(
  //     {
  //       mobile_no: mobile_no,
  //       is_verified: 1,
  //       registerby_mobile:1
  //     },
  //     {
  //       ignoreDuplicates: true, // Optional: to avoid inserting duplicates
  //     }
  //   );

  //   const otp = crypto.randomInt(1000, 10000).toString();
  
  //   const otpCreated = new Date();
  //   let response =null;
  //   // Sms Gateway start
  // //  response = await sendOTPToMobile(mobile_no,otp);
  // // Sms Gateway End
  //   const user = await ParentReg.findOne({ where: { mobile_no } });
  //   user.otp = otp;
  //   user.otp_datetime = otpCreated;
  //   await user.save();
  //  return res.status(200).json({ status: true, message: "Account Created and OTP sent successfullyyy", otp ,response});

  }
 
  
});

exports.resentOtp = asyncHandler(async (req, res) => {
  const { mobile_no } = req.body;

  if (!mobile_no) {
    return res
      .status(200)
      .json({ status: false, message: "Mobile number is required" });
  }

  const otp = crypto.randomInt(1000, 10000).toString();
  
    const otpCreated = new Date();

  // Check if mobile number exists
  const user = await ParentReg.findOne({ where: { mobile_no } });
  if (user) {
   let response='';
    // Sms Gateway start
  //  response = await sendOTPToMobile(mobile_no,otp);
  // Sms Gateway End
  
    // Update existing user's OTP
    user.otp = otp;
    user.otp_datetime = otpCreated;
    await user.save();
    return res
      .status(200)
      .json({ status: true, message: "OTP sent successfullyyy", otp ,response});
  } else {
    return res.status(200).json({ status: false, message: "User Not Exist" });
  }
});

// OTP Verification
exports.otpverify = asyncHandler(async (req, res) => {
  const { mobile_no, otp,fcm_token,mobile_uuid,mobile_info,mobile_platform } = req.body;

  if (!mobile_no || !otp) {
    return res
      .status(200)
      .json({ status: false, message: "Mobile number and OTP are required" });
  }

  const user = await ParentReg.findOne({ where: { mobile_no } });

  if (!user) {
    return res
      .status(200)
      .json({ status: false, message: "Mobile number not found" });
  }
  // ================  Token end   ==============================
  const tokenuser = {
    id: user?.parents_id,  // Replace with actual user ID
    role: 'AppUser', // Replace with actual role
};

// Generate token using the utility function
const token = generateToken(tokenuser);
// ===================   Token end   ==============================
  
  const storedOtp = user.otp;
  const otpCreated = new Date(user.otp_datetime);

  // Check if OTP is valid (assuming it's valid for 10 minutes)
  const now = new Date();
  const diffInMinutes = Math.floor((now - otpCreated) / 60000);

  if (storedOtp === otp && diffInMinutes <= 10) {
    // Mark the OTP as verified
    user.is_verified = 1;
    user.otp_datetime = now;
    user.active_datetime = now;
    user.last_visit_on = now;
    // user.is_active = 1;
    user.app_name = "EMESSANGER";
    user.active_by = 1;
    user.fcm_token = fcm_token?fcm_token:'';
    user.mobile_uuid = mobile_uuid?mobile_uuid:'';
    user.mobile_info = mobile_info?mobile_info:'';
    user.mobile_platform = mobile_platform?mobile_platform:'';
    await user.save();

    // Generate JWT token after OTP is verified
    // const token = jwt.sign(
    //   { mobile_no: user.mobile_no, userId: user.app_user_id }, // Payload: mobile_no and app_user_id
    //   JWT_SECRET, // Secret key
    //   { expiresIn: "1h" } // Token expiry time (1 hour)
    // );

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
      token: token, user// Return the JWT token
    });
    
  } else {
    return res
      .status(200)
      .json({ status: false, message: "Invalid or expired OTP" });
  }
});

