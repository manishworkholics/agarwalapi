const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController.js');

router.get('/getCategoryDetail', CategoryController.getCategoryDetail);
// Add a new category
router.post('/addCategory', CategoryController.addCategory);

// Get a single category by ID
router.get('/getSingleCategoryDetail/:categoryid', CategoryController.getCategoryDetail);

// Update a category by ID
router.put('/updateCategory/:categoryid', CategoryController.updateCategory);

module.exports = router;
