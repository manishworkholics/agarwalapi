const express = require('express');
const router = express.Router();
const schoolController = require("../controllers/schoolController");

const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.get('/getSchool',authMiddleware, schoolController.getSchool);
router.get('/getSingleSchool/:id',authMiddleware, schoolController.getSingleSchool);
router.post('/createSchool',authMiddleware, schoolController.createSchool);
router.put('/updateSchool/:id',authMiddleware, schoolController.updateSchool);


module.exports = router;
