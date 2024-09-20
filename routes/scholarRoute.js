const express = require('express');
const router = express.Router();
const ScholarController = require('../controllers/scholarController');

router.get('/getScholarDetail', ScholarController.getscholarDetail);

module.exports = router;
