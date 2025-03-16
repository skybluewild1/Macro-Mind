require('dotenv').config();
const axios = require('axios');

// Spoonacular API base URL
const SPOONACULAR_API_URL = 'https://api.spoonacular.com';

// Function to search food based on a query
async function searchFood(query, pageNumber = 1, maxResults = 20) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/search`, {
            params: {
                query: query,
                number: maxResults,
                offset: (pageNumber - 1) * maxResults,
                apiKey: process.env.SPOONACULAR_API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching food:', error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve food data');
    }
}

// Function to fetch food details by food id
async function getFoodDetails(foodId) {
    try {
        const response = await axios.get(`${SPOONACULAR_API_URL}/food/ingredients/${foodId}/information`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching food details:', error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve food details');
    }
}

module.exports = { searchFood, getFoodDetails };
