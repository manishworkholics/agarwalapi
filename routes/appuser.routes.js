const express = require('express');
const router = express.Router();
const appuserController = require('../controllers/appuser.controller');

router.get('/get-appUser', appuserController.getappuser);


module.exports = router;