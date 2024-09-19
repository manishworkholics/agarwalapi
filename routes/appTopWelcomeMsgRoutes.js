const express = require('express');
const router = express.Router();
const appTopWelcomeMsgDetailController = require('../controllers/appTopWelcomeMsgController');

router.get('/appTopWelcomeMsg', appTopWelcomeMsgDetailController.getappTopWelcomeMsgDetail);

module.exports = router;
