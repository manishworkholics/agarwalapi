const express = require('express');
const router = express.Router();
const NoticeBoardController = require('../controllers/noticeboardController');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.get('/getNoticeBoardDetail',authMiddleware, NoticeBoardController.getNoticeBoardDetail);
router.get('/getAllNoticeBoardDetail',authMiddleware, NoticeBoardController.getAllNoticeBoardDetail);
router.post('/addDocument',authMiddleware, NoticeBoardController.addDocument);
router.get('/getSingleDocumentDetail/:id',authMiddleware, NoticeBoardController.getSingleDocumentDetail);
router.put('/updateDocument/:id',authMiddleware, NoticeBoardController.updateDocument);

module.exports = router;
