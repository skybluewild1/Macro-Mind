// services/fatSecretService.js
const axios = require('axios');
require('dotenv').config();

let accessToken = null;
let tokenExpiration = null;

// Function to get a new access token
async function getAccessToken() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken; // Return cached token if still valid
    }

    try {
        const response = await axios.post(process.env.FATSECRET_TOKEN_URL, 
            "grant_type=client_credentials&scope=basic",
            {
                auth: {
                    username: process.env.FATSECRET_CLIENT_ID,
                    password: process.env.FATSECRET_CLIENT_SECRET
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );

        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // Convert to ms
        console.log("🔑 New Access Token Acquired");
        return accessToken;
    } catch (error) {
        console.error("❌ Error fetching access token:", error.response ? error.response.data : error.message);
        throw new Error("Failed to retrieve access token");
    }
}

// Function to search for food
async function searchFood(query, foodType = "Generic", meal = "lunch") {
    if (!isValidFoodType(foodType) || !isValidMealType(meal)) {
        throw new Error("Invalid foodType or meal parameter");
    }

    const token = await getAccessToken();
    
    try {
        const response = await axios.get(process.env.FATSECRET_BASE_URL, {
            params: {
                method: "foods.search",
                search_expression: query,
                food_type: foodType,
                meal: meal,
                format: "json"
            },
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error searching for food:", error.response ? error.response.data : error.message);
        throw new Error("Failed to retrieve food data");
    }
}

module.exports = { searchFood };
