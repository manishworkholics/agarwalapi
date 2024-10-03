const express = require('express');
const router = express.Router();
const appTopWelcomeMsgDetailController = require('../controllers/appTopWelcomeMsgController');

router.get('/appTopWelcomeMsg', appTopWelcomeMsgDetailController.getappTopWelcomeMsgDetail);
// Routes
router.post('/createAppTopWelcomeMsg', appTopWelcomeMsgDetailController.createAppTopWelcomeMsg);
router.get('/getSingleAppTopWelcomeMsg/:welcome_id', appTopWelcomeMsgDetailController.getSingleAppTopWelcomeMsg);
router.put('/updateAppTopWelcomeMsg/:welcome_id', appTopWelcomeMsgDetailController.updateAppTopWelcomeMsg);
router.delete('/deleteAppTopWelcomeMsg/:welcome_id', appTopWelcomeMsgDetailController.deleteAppTopWelcomeMsg);

module.exports = router;
