const express = require('express');
const router = express.Router();
const MsgController = require('../controllers/msgController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');


router.post('/addSubGroup',authMiddleware, MsgController.addSubGroup);
router.get('/getSubGroupDetail',authMiddleware, MsgController.getSubGroupData);
router.get('/getSingleSubGroup/:id',authMiddleware, MsgController.getSingleSubGroup);
router.delete('/deleteSubGroup/:msg_sgroup_id',authMiddleware, MsgController.deleteSubGroup);
router.put('/updateSubGroup/:id',authMiddleware, MsgController.updateSubGroup);

router.get('/searchGroups',authMiddleware, MsgController.searchGroups);
router.get('/searchSubGroups',authMiddleware, MsgController.searchSubGroups);


router.get('/getGroupDetail',authMiddleware, MsgController.getGroupData);
router.delete('/deleteGroup/:id',authMiddleware, MsgController.deleteGroup);
router.post('/addSingleGroupData',authMiddleware, MsgController.addSingleGroupData);

router.get('/getSingleGroupData/:id',authMiddleware, MsgController.getSingleGroupData);
router.put('/updateSingleGroupData/:msg_group_id',authMiddleware, MsgController.updateSingleGroupData);

router.get('/getMsgDetail',authMiddleware, MsgController.getmsgMaster);
router.get('/getSearchDetail',authMiddleware, MsgController.getSearchDetail);
// App mobile app start
//this is for just single master msg
router.get('/get_single_mst_msg_by_msg_id',authMiddleware, MsgController.get_Single_Msg_master_Detail_by_msg_id);

//getSingleMsgDetail by  sended_msg_id
router.get('/getSingleMsgDetail/:sended_msg_id',authMiddleware, MsgController.getSingleMsgDetail);
router.get('/getInboxMsgDetail/:mobile',authMiddleware, MsgController.getInboxMsgDetail);

router.get('/getSeenMsgDetail/:mobile',authMiddleware, MsgController.getSeenMsgDetail);
router.get('/getStaredMsgDetail/:mobile',authMiddleware, MsgController.getStaredMsgDetail);
router.get('/getLastdayMsgDetail/:mobile',authMiddleware, MsgController.getLastdayMsgDetail);
router.put('/seenStatusUpdateMsgDetail/:sended_msg_id', authMiddleware,MsgController.seenStatusUpdateMsgDetail);
router.put('/staredStatusUpdateMsgDetail/:sended_msg_id',authMiddleware, MsgController.staredStatusUpdateMsgDetail);
// App mobile app End

router.post('/insertMsgData',authMiddleware, MsgController.insertMsgData);
// =========================ye api seprate school + admin ko use hogi=======================================
router.get('/SentMsgToScholarData',authMiddleware, MsgController.SentMsgToScholarData);
// ==============================================================
router.get('/test',authMiddleware, MsgController.getmsgbody);
// router.get('/testing2/:mobile',authMiddleware, MsgController.testing2);
module.exports = router;
