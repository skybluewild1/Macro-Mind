require('dotenv').config();
const axios = require('axios');

const SPOONACULAR_API_URL = 'https://api.spoonacular.com';

// 🍎 Search Ingredients
async function searchIngredients(query, pageNumber = 1, maxResults = 20) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/ingredients/search`, {
            params: {
                query: query,
                number: maxResults,
                offset: (pageNumber - 1) * maxResults,
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching ingredients:', error.response?.data || error.message);
        throw new Error('Failed to retrieve ingredient data');
    }
}

// 🍽️ Get Ingredient Details
async function getIngredientDetails(ingredientId) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/ingredients/${ingredientId}/information`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredient details:', error.response?.data || error.message);
        throw new Error('Failed to retrieve ingredient details');
    }
}

module.exports = { searchIngredients, getIngredientDetails };
