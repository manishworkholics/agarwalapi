const express = require('express');
const router = express.Router();
const appuserController = require('../controllers/appUserController');

router.get('/get-appUser', appuserController.getappuser);


module.exports = router;