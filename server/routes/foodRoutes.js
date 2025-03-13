// routes/foodRoutes.js
const cors = require('cors')
const express = require('express');
const router = express.Router();
const { searchFoodController, getFoodDetailsController } = require('../controllers/fatSecretController');
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)
// Search route
router.get('/search', searchFoodController);
router.get('/details', getFoodDetailsController); 


module.exports = router;
