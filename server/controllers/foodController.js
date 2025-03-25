const { searchIngredients, getIngredientDetails } = require('../Services/spoonacularService');

async function searchFoodController(req, res) {
    const query = req.query.q;
    const pageNumber = req.query.page_number || 1;  // Default page number
    const maxResults = req.query.max_results || 20; // Default max results

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const data = await searchIngredients(query, pageNumber, maxResults);
        res.json(data);
    } catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve ingredient data' });
    }
}

async function getFoodDetailsController(req, res) {
    const foodId = req.query.food_id;

    if (!foodId) {
        return res.status(400).json({ error: 'Food ID is required' });
    }

    try {
        const foodDetails = await getIngredientDetails(foodId);
        res.json(foodDetails);
    } catch (error) {
        console.error('Details error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve ingredient details' });
    }
}

module.exports = { searchFoodController, getFoodDetailsController };
