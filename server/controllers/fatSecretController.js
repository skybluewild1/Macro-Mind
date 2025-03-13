const { searchFood, getFoodDetails } = require('../Services/fatSecretService');  // Import both functions

// Controller function to handle food search
async function searchFoodController(req, res) {
    const query = req.query.q;
    const pageNumber = req.query.page_number || 0;  // Default to 0 if not provided
    const maxResults = req.query.max_results || 20; // Default to 20 if not provided

    // Check if query parameter exists
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Call the searchFood function with the query, pageNumber, and maxResults
        const data = await searchFood(query, pageNumber, maxResults);

        // Send the data back in the response
        res.json(data);
    } catch (error) {
        // Handle error and send back appropriate message
        res.status(500).json({ error: error.message });
    }
}

const fetch = require('node-fetch');

// Controller function to get food details based on food_id
async function getFoodDetailsController(req, res) {
    const food_id = req.query.food_id;

    if (!food_id) {
        return res.status(400).json({ error: 'Food ID is required' });
    }

    try {
        // Call the getFoodDetails function to fetch the details of the food
        const foodDetails = await getFoodDetails(food_id);

        // Extract relevant details from the food object
        const foodData = foodDetails.foods.food;
        
        // Check if foodData is present
        if (!foodData) {
            return res.status(404).json({ error: 'Food details not found' });
        }

        // Send the food details back in the response
        res.json({
            food_name: foodData.food_name,
            food_description: foodData.food_description,
            food_url: foodData.food_url,
            brand_name: foodData.brand_name,
        });
    } catch (error) {
        // Handle error and send back appropriate message
        res.status(500).json({ error: error.message });
    }
}


module.exports = { searchFoodController, getFoodDetailsController };  // Export both controllers
