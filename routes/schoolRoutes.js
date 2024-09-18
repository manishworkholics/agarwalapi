const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/get-school', schoolController.getschool);


module.exports = router;