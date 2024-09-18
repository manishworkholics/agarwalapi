const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController.js');

router.get('/getCategoryDetail', CategoryController.getCategoryDetail);

module.exports = router;
