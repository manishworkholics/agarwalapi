const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/getSchool', schoolController.getSchool);


module.exports = router;