const express = require('express');
const router = express.Router();
const { searchFoodController, getFoodDetailsController } = require('../controllers/foodController');


router.get('/search', searchFoodController);


router.get('/details', getFoodDetailsController);

module.exports = router;
