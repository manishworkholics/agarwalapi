const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/createAdmin', adminController.createAdmin);
router.post('/loginAdmin', adminController.loginAdmin);
router.put('/updatePassword', adminController.updatePassword);
router.put('/updateProfileDetail/:admin_id', adminController.updateProfileDetail);
router.get('/getAllAdmin', adminController.getAllAdmin);
router.get('/getSingleAdmin/:id', adminController.getSingleAdmin);



module.exports = router;