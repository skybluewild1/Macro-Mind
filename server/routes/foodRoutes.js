const express = require('express');
const router = express.Router();
const { searchFoodController, getFoodDetailsController } = require('../controllers/foodController');

// Search route
router.get('/search', searchFoodController);

// Food details route
router.get('/details', getFoodDetailsController);

module.exports = router;
