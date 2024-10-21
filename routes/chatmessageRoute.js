const express = require('express');
const router = express.Router();
const ChatMsgController = require('../controllers/chatMessageController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.post('/send_chat_msg1',authMiddleware, ChatMsgController.sendMessage1);
// Add a new category
router.get('/get_group_chat_message',authMiddleware, ChatMsgController.getChatGroupMessagesByGroupId);


module.exports = router;
