// services/fatSecretService.js
require('dotenv').config();
const axios = require('axios');
let accessToken = null;
let tokenExpiration = null;

// Function to get a new access token
async function getAccessToken() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken; // Return cached token if still valid
    }

    try {
        //console.log('FATSECRET_CLIENT_ID:', process.env.FATSECRET_CLIENT_ID);
       // console.log('FATSECRET_CLIENT_SECRET:', process.env.FATSECRET_CLIENT_SECRET);

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
        //console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error("❌ Error fetching access token:", error.response ? error.response.data : error.message);
        throw new Error("Failed to retrieve access token");
    }
}
//food Details
async function getFoodDetails(food_id) {
   // Make an API call to FatSecret to get detailed info about the food by food_id
   const response = await fetch(`https://platform.fatsecret.com/rest/foods/get/${food_id}?format=json`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.FATSECRET_ACCESS_TOKEN}`,
    }
});

if (!response.ok) {
    throw new Error('Failed to fetch food details');
}

return await response.json();
}
// Function to search for food
async function searchFood(query, pageNumber = 0, maxResults = 20) {
    const token = await getAccessToken();

    try {
        const response = await axios.get("https://platform.fatsecret.com/rest/foods/search/v1", {
            params: {
                method: "foods.search",
                search_expression: query,
                page_number: pageNumber,
                max_results: maxResults,
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

module.exports = { searchFood, getFoodDetails};