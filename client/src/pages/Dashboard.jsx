import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./Dashboard.css"; // Importing CSS for styling

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Autocomplete results
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [foodResults, setFoodResults] = useState([]); // Store product search results
    const [selectedFood, setSelectedFood] = useState(null); // Store selected product details
    const [calories, setCalories] = useState(0); // Total calorie count
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 }); // Macronutrient tracker
    const [quantityModal, setQuantityModal] = useState(false); // State to control quantity input modal
    const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID for quantity
    const [quantity, setQuantity] = useState(""); // Store quantity input
    const [unit, setUnit] = useState(""); // Store the unit of measurement (grams, cups, etc.)
    const [userProducts, setUserProducts] = useState([]); // Store user's added products and quantities

    // Function to handle search form submission (Spoonacular product search integration)
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFoodResults([]);  // Reset the previous results
        setError("");  // Reset error

        try {
            const response = await fetch(`https://api.spoonacular.com/food/products/search?query=${query}&number=5&apiKey=44c64a1459da472185a7671b540fa583`);
            if (!response.ok) throw new Error("Failed to fetch food data");

            const data = await response.json();
            setFoodResults(data.products || []); // Store product results
            setLoading(false); // Stop loading
        } catch (err) {
            console.error(err);
            setError("Failed to fetch food results.");
            setLoading(false); // Stop loading
        }
    };

    // Handle product selection and fetch its details
    const handleFoodSelect = async (productId) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/products/${productId}?apiKey=44c64a1459da472185a7671b540fa583`);
            if (!response.ok) throw new Error("Failed to fetch product details");

            const productDetails = await response.json();

            // Extract nutrition info from product details (if available)
            const nutrition = productDetails.nutrition ? productDetails.nutrition.nutrients.reduce((acc, nutrient) => {
                if (nutrient.name === "Calories") acc.calories = nutrient.amount;
                if (nutrient.name === "Fat") acc.fat = nutrient.amount;
                if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
                if (nutrient.name === "Protein") acc.protein = nutrient.amount;
                return acc;
            }, { calories: 0, fat: 0, carbs: 0, protein: 0 }) : {};

            setSelectedFood({
                foodName: productDetails.title,
                foodImage: productDetails.image,
                foodUrl: productDetails.sourceUrl,
                nutrition: nutrition,
            });

            // Update calories and macronutrients
            setCalories(nutrition.calories);
            setMacros(nutrition);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch product details.");
        }
    };

    // Handle the "Add Quantity" button click and show the modal
    const handleAddQuantity = (productId) => {
        setSelectedProductId(productId);
        setQuantityModal(true); // Open modal
    };

    // Handle quantity submission
    const handleQuantitySubmit = () => {
        // Validate the quantity and unit
        if (!quantity || !unit) {
            setError("Please enter a valid quantity and unit.");
            return;
        }

        const newProduct = {
            productId: selectedProductId,
            quantity,
            unit,
        };

        // Store the product with its quantity in the user's products data
        setUserProducts([...userProducts, newProduct]);

        // Close the modal
        setQuantityModal(false);
        setQuantity(""); // Reset quantity
        setUnit(""); // Reset unit
        setError(""); // Clear any previous error
    };

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

                        {/* Display product results */}
                        {foodResults.length > 0 && (
                            <ul className="food-results">
                                {foodResults.map((food) => (
                                    <li
                                        key={food.id}
                                        className="food-item"
                                        onClick={() => handleFoodSelect(food.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <strong>{food.title}</strong>
                                        {/* Only show image if it exists */}
                                        {food.image && <img src={food.image} alt={food.title} />}
                                        {/* Add Plus Button */}
                                        <button onClick={() => handleAddQuantity(food.id)} className="add-quantity-button">+</button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Display selected food details */}
                        {selectedFood && (
                            <div className="food-details">
                                <h2>{selectedFood.foodName}</h2>
                                {selectedFood.foodImage && (
                                    <img src={selectedFood.foodImage} alt={selectedFood.foodName} />
                                )}
                                <p><strong>Calories:</strong> {selectedFood.nutrition.calories} kcal</p>
                                <p><strong>Fat:</strong> {selectedFood.nutrition.fat} g</p>
                                <p><strong>Carbs:</strong> {selectedFood.nutrition.carbs} g</p>
                                <p><strong>Protein:</strong> {selectedFood.nutrition.protein} g</p>
                                <a href={selectedFood.foodUrl} target="_blank" rel="noopener noreferrer">More info</a>
                            </div>
                        )}
                    </div>

                    {/* Quantity Input Modal */}
                    {quantityModal && (
                        <div className="quantity-modal">
                            <h3>Add Quantity</h3>
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="quantity-input"
                            />
                            <select onChange={(e) => setUnit(e.target.value)} value={unit} className="unit-selector">
                                <option value="">Select Unit</option>
                                <option value="grams">Grams</option>
                                <option value="cups">Cups</option>
                                <option value="tbsp">Tablespoons</option>
                                {/* Add more units as needed */}
                            </select>
                            <button onClick={handleQuantitySubmit} className="submit-quantity-button">
                                Add Quantity
                            </button>
                            <button onClick={() => setQuantityModal(false)} className="close-modal-button">
                                Close
                            </button>
                        </div>
                    )}

                    {/* Display Added Products */}
                    <div>
                        <h2>Your Added Products</h2>
                        <ul>
                            {userProducts.map((item, index) => (
                                <li key={index}>
                                    {item.quantity} {item.unit} of product {item.productId}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            ) : (
                <p className="no-user">Please log in to see your dashboard.</p>
            )}
        </div>
    );
}
