const express = require('express');
const router = express.Router();
const NoticeBoardController = require('../controllers/noticeboardController');

router.get('/getNoticeBoardDetail', NoticeBoardController.getNoticeBoardDetail);
router.post('/addDocument', NoticeBoardController.addDocument);
router.get('/getSingleDocumentDetail/:id', NoticeBoardController.getSingleDocumentDetail);
router.put('/updateDocument/:id', NoticeBoardController.updateDocument);

module.exports = router;
