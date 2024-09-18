const express = require('express');
const router = express.Router();
const NoticeBoardController = require('../controllers/noticeboardController');

router.get('/getNoticeBoardDetail', NoticeBoardController.getNoticeBoardDetail);

module.exports = router;
