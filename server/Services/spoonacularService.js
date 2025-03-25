require('dotenv').config();
const axios = require('axios');

// Spoonacular API base URL
// Spoonacular API base URL
const SPOONACULAR_API_URL = 'https://api.spoonacular.com';

// Function to search ingredients
async function searchIngredients(query, pageNumber = 1, maxResults = 20) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/ingredients/search`, {
            params: {
                query: query,
                number: maxResults,
                offset: (pageNumber - 1) * maxResults,
                apiKey: process.env.SPOONACULAR_API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching ingredients:', error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve ingredient data');
    }
}

// Function to fetch ingredient details by ID
async function getIngredientDetails(ingredientId) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/ingredients/${ingredientId}/information`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredient details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve ingredient details');
    }
}

module.exports = { searchIngredients, getIngredientDetails };

