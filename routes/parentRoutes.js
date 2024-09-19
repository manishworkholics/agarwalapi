const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

router.post('/signup', parentController.signUp);
router.post('/login', parentController.login);
router.post('/otp', parentController.generateOtp);
router.post('/otp-verify', parentController.otpverify);

module.exports = router;
