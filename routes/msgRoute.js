const express = require('express');
const router = express.Router();
const MsgController = require('../controllers/msgController.js');

router.post('/addSubGroup', MsgController.addSubGroup);
router.get('/getSubGroupDetail', MsgController.getSubGroupData);
router.get('/getSingleSubGroup/:id', MsgController.getSingleSubGroup);
router.put('/updateSubGroup/:id', MsgController.updateSubGroup);

router.get('/getGroupDetail', MsgController.getGroupData);
router.post('/addSingleGroupData', MsgController.addSingleGroupData);

router.get('/getSingleGroupData/:id', MsgController.getSingleGroupData);
router.put('/updateSingleGroupData/:msg_group_id', MsgController.updateSingleGroupData);

router.get('/getMsgDetail', MsgController.getmsgMaster);
router.post('/insertMsgData', MsgController.insertMsgData);
router.get('/test', MsgController.getmsgbody);

module.exports = router;
