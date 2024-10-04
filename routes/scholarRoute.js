const express = require('express');
const router = express.Router();
const ScholarController = require('../controllers/scholarController');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.get('/getScholarDetail',authMiddleware, ScholarController.getscholarDetail);
router.post('/insertScholarRecord',authMiddleware, ScholarController.insertScholarRecord);

module.exports = router;
