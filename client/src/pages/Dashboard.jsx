import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./Dashboard.css"; // Importing CSS for styling

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Autocomplete results
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [foodResults, setFoodResults] = useState([]); //new
    const [selectedFood, setSelectedFood] = useState(null); //new
    const [foodDetails, setFoodDetails] = useState(null); // Store selected food details
    const [calories, setCalories] = useState(0); // Total calorie count
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 }); // Macronutrient tracker
     // Function to handle search form submission
     const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setFoodDetails(null);  // Reset the details when performing a new search
        setError(null); // Reset error
        try {
            const response = await fetch(`http://localhost:8000/api/food/search?q=${query}&page_number=0&max_results=20`);
            if (!response.ok) throw new Error("Failed to fetch food data");
    
            const data = await response.json();
            setFoodResults(data.foods.food || []); // Store food results
        } catch (err) {
            console.error(err);
            setError("Failed to fetch food results.");
        }
    };
    
    // Handle autocomplete suggestions
    /*
    const fetchAutocompleteSuggestions = async (searchTerm) => {
        if (searchTerm.length < 2) return setSuggestions([]);
        
        try {
            const response = await fetch(`http://localhost:8000/api/food/autocomplete?q=${searchTerm}`);
            if (!response.ok) throw new Error("Failed to fetch suggestions");
            
            const data = await response.json();
            setSuggestions(data.suggestions || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch suggestions.");
        }
    };
    */
    // Handle food selection and fetch its details
    const handleFoodSelect = async (foodId) => {
        try {
            // Make the fetch request to get the food details
            const response = await fetch(`http://localhost:8000/api/food/details?food_id=${foodId}`);
    
            if (!response.ok) {
                // If the response status is not OK, log the status and throw an error
                console.error(`Error: ${response.statusText}`);
                throw new Error("Failed to fetch food details");
            }
    
            // Parse the response data
            const foodDetails = await response.json();
    
            // Log the full response to inspect the structure
            console.log("Full response:", foodDetails);
    
            // Check if the food details are available
            if (!foodDetails || !foodDetails.foods || !foodDetails.foods.food) {
                throw new Error("Food details not found in the response.");
            }
    
            // Extract the food data
            const foodDescription = foodDetails.foods.food.food_description || "No description available";
            const nutrition = extractNutrition(foodDescription);
    
            // Update state with the fetched food details
            setFoodDetails({
                ...foodDetails.foods.food,
                nutrition: nutrition,
            });
        } catch (err) {
            // Log any errors to understand the issue
            console.error("Error fetching food details:", err);
            setError("Failed to fetch food details.");
        }
    };
    
    
    

    function extractNutrition(description) {
        // Create an object to hold the extracted values
        const nutrition = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        };
    
        // Regular expression to extract values
        const regex = /Calories:\s*(\d+)(kcal)|Fat:\s*(\d+(\.\d+)?)(g)|Carbs:\s*(\d+(\.\d+)?)(g)|Protein:\s*(\d+(\.\d+)?)(g)/g;
        let match;
    
        while ((match = regex.exec(description)) !== null) {
            if (match[1]) {
                nutrition.calories = parseFloat(match[1]);
            }
            if (match[3]) {
                nutrition.fat = parseFloat(match[3]);
            }
            if (match[5]) {
                nutrition.carbs = parseFloat(match[5]);
            }
            if (match[7]) {
                nutrition.protein = parseFloat(match[7]);
            }
        }
    
        return nutrition;
    }
    
    
    
    /*
    const handleFoodClick = async (foodName) => {
        setSuggestions([]);
        setQuery(foodName); // Set input value to selected food
        
        try {
            const response = await fetch(`http://localhost:8000/api/food/details?food_name=${foodName}`);
            if (!response.ok) throw new Error("Failed to retrieve food details");
            
            const foodData = await response.json();
            setFoodDetails(foodData);
    
            // Update calories and macronutrients
            setCalories(prevCalories => prevCalories + (foodData.nutrition.calories || 0));
            setMacros(prevMacros => ({
                protein: prevMacros.protein + (foodData.nutrition.protein || 0),
                carbs: prevMacros.carbs + (foodData.nutrition.carbs || 0),
                fat: prevMacros.fat + (foodData.nutrition.fat || 0),
            }));
        } catch (err) {
            console.error(err);
            setError("Failed to fetch food details. Please try again.");
        }
    };
*/
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            {user ? (
                <div className="user-card">
                    <h2 className="greeting">Hi {user.username}!</h2>
                    <p className="user-info">You are all set to track your progress and goals.</p>

                    {/* Radial Wheel Progress Tracker */}
                    <div className="radial-slider-container">
                        <h2 className="radial-slider-title">Progress</h2>
                        <div className="radial-wheel">
                            <div className="radial-wheel-background">
                                <div
                                    className="radial-wheel-fill"
                                    style={{ transform: `rotate(${(calories / 2500) * 360}deg)` }}
                                ></div>
                                <div className="radial-wheel-handle"></div>
                            </div>
                        </div>
                        <p className="progress-info">Calories: {calories} / 2500</p>
                        <p className="progress-info">Protein: {macros.protein}g</p>
                        <p className="progress-info">Carbs: {macros.carbs}g</p>
                        <p className="progress-info">Fat: {macros.fat}g</p>
                    </div>

                    {/* Food Search */}
                    <div className="food-search-container">
                        <h2 className="food-search-title">Search for Food</h2>
                        <div className="food-search-bar">
                            <input
                                type="text"
                                placeholder="Search for food..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="food-search-input"
                            />
                            <button onClick={handleSearchSubmit} className="food-search-button">
                                Search
                            </button>
                        </div>

                        {/* Display loading or error */}
                        {loading && <p>Loading...</p>}
                        {error && <p className="error-message">{error}</p>}

                        {/* Display food results */}
                        {foodResults.length > 0 && (
                            <ul className="food-results">
                                {foodResults.map((food) => (
                                    <li
                                        key={food.food_id}
                                        className="food-item"
                                        onClick={() => handleFoodSelect(food.food_id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <strong>{food.food_name}</strong>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Display selected food details */}
                        {foodDetails && (
    <div className="food-details">
        <h2>{foodDetails.food_name}</h2>
        <p><strong>Description:</strong> {foodDetails.food_description}</p>
        <p><strong>Brand:</strong> {foodDetails.brand_name || "N/A"}</p>
        <p><strong>Calories:</strong> {foodDetails.nutrition.calories} kcal</p>
        <p><strong>Fat:</strong> {foodDetails.nutrition.fat} g</p>
        <p><strong>Carbs:</strong> {foodDetails.nutrition.carbs} g</p>
        <p><strong>Protein:</strong> {foodDetails.nutrition.protein} g</p>
        <a href={foodDetails.food_url} target="_blank" rel="noopener noreferrer">More info</a>
    </div>
)}

                    </div>
                </div>
            ) : (
                <p className="no-user">Please log in to see your dashboard.</p>
            )}
        </div>
    );
};

