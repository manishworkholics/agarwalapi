const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');

router.get('/get-school', schoolController.getschool);


module.exports = router;