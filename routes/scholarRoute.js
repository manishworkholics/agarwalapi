const express = require('express');
const router = express.Router();
const ScholarController = require('../controllers/scholarController');

router.get('/getScholarDetail', ScholarController.getscholarDetail);
router.post('/insertScholarRecord', ScholarController.insertScholarRecord);

module.exports = router;
