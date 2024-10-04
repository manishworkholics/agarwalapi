const express = require('express');
const router = express.Router();
const CombineController = require('../controllers/combinedController');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.get('/getCombineHomePageDetail',authMiddleware, CombineController.getCombineHomePageDetail);
router.get('/getRelatedProfile',authMiddleware, CombineController.getRelatedProfile);

module.exports = router;
