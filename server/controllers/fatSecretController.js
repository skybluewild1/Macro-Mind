// controllers/foodControllers.js
const { searchFood } = require('../Services/fatSecretService');

// Controller function to handle food search
async function searchFoodController(req, res) {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const data = await searchFood(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { searchFoodController };
