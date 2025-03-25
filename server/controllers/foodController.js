const { searchIngredients, getIngredientDetails } = require('../Services/spoonacularService');

// Controller function to handle food search
async function searchFoodController(req, res) {
    const query = req.query.q;
    const pageNumber = req.query.page_number || 1;  // Default to 1 if not provided
    const maxResults = req.query.max_results || 20; // Default to 20 if not provided

    // Check if query parameter exists
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Call the searchFood function with the query, pageNumber, and maxResults
        const data = await searchIngredients(query, pageNumber, maxResults);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller function to handle food details
async function getFoodDetailsController(req, res) {
    const foodId = req.query.food_id;

    if (!foodId) {
        return res.status(400).json({ error: 'Food ID is required' });
    }
    try {
        const foodDetails = await getIngredientDetails(foodId);
        res.json(foodDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { searchFoodController, getFoodDetailsController };
