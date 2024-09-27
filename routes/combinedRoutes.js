const express = require('express');
const router = express.Router();
const CombineController = require('../controllers/combinedController');

router.get('/getCombineHomePageDetail', CombineController.getCombineHomePageDetail);
router.get('/getRelatedProfile', CombineController.getRelatedProfile);

module.exports = router;
