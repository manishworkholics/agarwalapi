const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/getSchool', schoolController.getSchool);
router.get('/getSingleSchool/:id', schoolController.getSingleSchool);
router.post('/createSchool', schoolController.createSchool);
router.put('/updateSchool/:id', schoolController.updateSchool);

module.exports = router;