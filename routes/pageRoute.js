const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

 router.get('/getpageDetail',authMiddleware, pageController.getAllpageDetail);
// // Add a new page
 router.post('/addpage',authMiddleware, pageController.addpage);

// // Get a single page by ID
 router.get('/getSinglepageDetail/:pageid',authMiddleware, pageController.getpageDetail);

// // Update a page by ID
 router.put('/updatepage/:pageid',authMiddleware, pageController.updatepage);

module.exports = router;
