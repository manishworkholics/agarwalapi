const express = require('express');
const router = express.Router();
const MsgController = require('../controllers/msgController.js');

router.get('/getSubGroupDetail', MsgController.getSubGroupData);

module.exports = router;
