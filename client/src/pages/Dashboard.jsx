import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./Dashboard.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

// Function to calculate maintenance calories using Mifflin-St Jeor equation
const calcMaintCals = (sex, weight, height, age, activity) => {
    if (!sex) return "Invalid gender input";

    const kg = weight / 2.205;
    const cm = height * 2.54;
    const normalizedSex = sex.trim().toLowerCase();

    if (normalizedSex === "male") {
        return activity * ((10 * kg) + (6.25 * cm) - (5 * age) + 5);
    } else if (normalizedSex === "female") {
        return activity * ((10 * kg) + (6.25 * cm) - (5 * age) - 161);
    }
    return "Invalid gender input";
};

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // State variables
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [foodResults, setFoodResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [calories, setCalories] = useState(0);
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
    const [quantityModal, setQuantityModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [userProducts, setUserProducts] = useState([]);

    const maintenanceCalories = user
        ? calcMaintCals(user.sex, user.weight, user.height, user.age, user.activity)
        : 2000; // Default fallback value

    // Fetch products using Spoonacular API
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFoodResults([]);
        setError("");

        try {
            const response = await api.get(`/search`, {
                params: { q: query, page_number: 1, max_results: 5 }
            });

            setFoodResults(response.data.results || []);
        } catch (err) {
            setError("Failed to fetch food results.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch selected food details
    const handleFoodSelect = async (foodId) => {
        setLoading(true);
        try {
            const response = await api.get(`/details`, {
                params: { food_id: foodId }
            });

            const productDetails = response.data;
            const nutrition = productDetails.nutrition
                ? productDetails.nutrition.nutrients.reduce((acc, nutrient) => {
                    if (nutrient.name === "Calories") acc.calories = nutrient.amount;
                    if (nutrient.name === "Fat") acc.fat = nutrient.amount;
                    if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
                    if (nutrient.name === "Protein") acc.protein = nutrient.amount;
                    return acc;
                }, { calories: 0, fat: 0, carbs: 0, protein: 0 })
                : {};

            setSelectedFood({
                foodName: productDetails.title,
                foodImage: productDetails.image,
                foodUrl: productDetails.sourceUrl,
                nutrition,
                servingSize: productDetails.nutrition?.servingSize || 100,
                caloriesPerServing: nutrition.calories,
            });

            setCalories(nutrition.calories);
            setMacros(nutrition);
        } catch (err) {
            setError("Failed to fetch product details.");
        } finally {
            setLoading(false);
        }
    };

    // Open quantity modal
    const handleAddQuantity = (productId) => {
        setSelectedProductId(productId);
        setQuantityModal(true);
    };

    // Handle quantity submission
    const handleQuantitySubmit = () => {
        if (!quantity || !unit) {
            setError("Please enter a valid quantity and unit.");
            return;
        }

        const servingSize = selectedFood?.servingSize || 100;
        const caloriesPerServing = selectedFood?.caloriesPerServing || 0;

        let totalCalories = 0;
        if (unit === "grams") {
            totalCalories = (caloriesPerServing / servingSize) * quantity;
        }

        const newProduct = {
            productId: selectedProductId,
            quantity,
            unit,
            totalCalories,
        };

        setUserProducts([...userProducts, newProduct]);
        setQuantityModal(false);
        setQuantity("");
        setUnit("");
        setError("");
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>

            {user ? (
                <div className="user-card">
                    <h2 className="greeting">Hi {user.username}!</h2>
                    <p className="user-info">Track your progress and goals.</p>

                    {/* Radial Progress Wheel */}
                    <div className="radial-slider-container">
                        <h2 className="radial-slider-title">Progress</h2>
                        <div className="radial-wheel">
                            <div className="radial-wheel-background">
                                <div
                                    className="radial-wheel-fill"
                                    style={{ transform: `rotate(${(calories / maintenanceCalories) * 360}deg)` }}
                                />
                            </div>
                        </div>
                        <p>Calories: {calories} / {maintenanceCalories}</p>
                        <p>Protein: {macros.protein}g</p>
                        <p>Carbs: {macros.carbs}g</p>
                        <p>Fat: {macros.fat}g</p>
                    </div>

                    {/* Food Search */}
                    <div className="food-search-container">
                        <h2>Search for Food</h2>
                        <div className="food-search-bar">
                            <input
                                type="text"
                                placeholder="Search for food..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button onClick={handleSearchSubmit}>Search</button>
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p className="error-message">{error}</p>}

                        <ul className="food-results">
                            {foodResults.map((food) => (
                                <li key={food.id} onClick={() => handleFoodSelect(food.id)}>
                                    <strong>{food.title}</strong>
                                    {food.image && (
                                        <img
                                            src={`https://spoonacular.com/cdn/ingredients_100x100/${food.image}`}
                                            alt={food.title}
                                        />
                                    )}
                                    <button onClick={() => handleAddQuantity(food.id)}>+</button>
                                </li>
                            ))}
                        </ul>

                        {selectedFood && (
                            <div className="food-details">
                                <h2>{selectedFood.foodName}</h2>
                                {selectedFood.foodImage && (
                                    <img src={selectedFood.foodImage} alt={selectedFood.foodName} />
                                )}
                                <p>Calories: {selectedFood.caloriesPerServing} kcal</p>
                                <p>Fat: {selectedFood.nutrition.fat} g</p>
                                <p>Carbs: {selectedFood.nutrition.carbs} g</p>
                                <p>Protein: {selectedFood.nutrition.protein} g</p>
                                <a href={selectedFood.foodUrl} target="_blank" rel="noopener noreferrer">More info</a>
                            </div>
                        )}
                    </div>

                    {/* Display Added Products */}
                    <div>
                        <h2>Your Added Products</h2>
                        <ul>
                            {userProducts.map((item, index) => (
                                <li key={index}>
                                    {item.quantity} {item.unit}, Calories: {item.totalCalories}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
}
