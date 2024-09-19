const express = require('express');
const router = express.Router();
const appScrollerMsgController = require('../controllers/appScrollerMsgController');

router.get('/getAppScrollerMsgDetail', appScrollerMsgController.getappScrollerMsgDetail);

module.exports = router;
