import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./TrackCals.css"; // Create and style this file accordingly

export default function TrackCals() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
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
    const handleSearchSubmit = async () => {
        //e.preventDefault();
        if (!query) return;  // Avoid empty search requests
        setLoading(true);
        setError(null);  // Reset error

        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=5&apiKey=44c64a1459da472185a7671b540fa583`
            );
    
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);  // Log the response to verify it
     
             // Update the food results state with the API response
             setFoodResults(data.results);  // Access the 'results' array
         } catch (error) {
             console.error('Error:', error);
             setError('Failed to fetch data. Please try again.');
         } finally {
             setLoading(false);
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

            const servingSize = productDetails.nutrition ? productDetails.nutrition.servingSize : 100; // Assume the default is 100g
            const caloriesPerServing = nutrition.calories;

            setSelectedFood({
                foodName: productDetails.title,
                foodImage: productDetails.image,
                foodUrl: productDetails.sourceUrl,
                nutrition: nutrition,
                servingSize, // Store the serving size for calculations
                caloriesPerServing, // Store calories per serving size (e.g., 100g)
            });

        } catch (error) {
            console.error("Error selecting food:", error);
        }
    };

    // Handle the "Add Quantity" button click and show the modal
    const handleAddQuantity = (productId) => {
        setSelectedProductId(productId);
        setQuantityModal(true); // Open modal
    };

    // Handle quantity submission and calculate calories
    const handleQuantitySubmit = () => {
        if (!selectedFood || !quantity || !unit) return;
     
         const baseCalories = selectedFood.caloriesPerServing;
         const baseMacros = selectedFood.nutrition;

        let totalCalories = 0;
        let totalProtein = 0;
         let totalCarbs = 0;
         let totalFat = 0;
     
         if (unit === "whole") {
             // Calculate based on the number of whole items
             totalCalories = baseCalories * quantity;
             totalProtein = baseMacros.protein * quantity;
             totalCarbs = baseMacros.carbs * quantity;
             totalFat = baseMacros.fat * quantity;
         } else {
             // For grams, cups, tbsp → use standard logic (assumes 1 serving size reference)
             const factor = parseFloat(quantity);  // Quantity factor
             totalCalories = baseCalories * factor;
             totalProtein = baseMacros.protein * factor;
             totalCarbs = baseMacros.carbs * factor;
             totalFat = baseMacros.fat * factor;
        }
        // Add product to the list with the calculated values
        const newProduct = {
            productId: selectedFood.foodName,
             quantity: quantity,
             unit: unit,
             totalCalories: totalCalories.toFixed(2),
             protein: totalProtein.toFixed(2),
             carbs: totalCarbs.toFixed(2),
             fat: totalFat.toFixed(2),
        };

        // Update state
        setUserProducts((prevProducts) => [...prevProducts, newProduct]);
        setQuantity("");
        setUnit("");
    };

    return (
        <div>
            <h1>Search Page</h1>
            {/* Food Search */}
            <div className="food-search-container">
                        <h2 className="food-search-title">Search for Ingredients</h2>
                        <div className="food-search-bar">
                            <input
                                type="text"
                                placeholder="Search for ingredients..."
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

                        {/* Display ingredient results */}
                        {foodResults.length > 0 && (
                            <ul className="food-results">
                                {foodResults.map((food) => (
                                    <li
                                        key={food.id}
                                        className="food-item"
                                        onClick={() => handleFoodSelect(food.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <strong>{food.name}</strong>  {/* Display the ingredient name */}
                                         
                                         {/* Display image if available */}
                                         {food.image && (
                                             <img
                                                 src={`https://spoonacular.com/cdn/ingredients_100x100/${food.image}`}
                                                 alt={food.name}
                                             />
                                         )}
     
                                         {/* Add Button */}
                                        <button onClick={() => handleAddQuantity(food.id)} className="add-quantity-button">+</button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Display selected ingredient details */}
                        {selectedFood && (
                            <div className="food-details">
                                <h2>{selectedFood.foodName}</h2>
                                {/* Display ingredient image */}
                                {selectedFood.foodImage && (
                                    <img
                                    src={`https://spoonacular.com/cdn/ingredients_100x100/${selectedFood.foodImage}`}
                                    alt={selectedFood.foodName}
                                    />
                                )}
                                {/* Ingredient Nutritional Information */}
                                <p><strong>Calories per Serving:</strong> {selectedFood.caloriesPerServing} kcal</p>
                                <p><strong>Fat:</strong> {selectedFood.nutrition.fat} g</p>
                                <p><strong>Carbs:</strong> {selectedFood.nutrition.carbs} g</p>
                                <p><strong>Protein:</strong> {selectedFood.nutrition.protein} g</p>
                                {/* More Info Link */}
                                <a
                                     href={selectedFood.foodUrl}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                 >
                                     More info
                                 </a>
                            </div>
                        )}
                    </div>

                    {/* Quantity Input Modal */}
                    {quantityModal && (
                        <div className="quantity-modal">
                            <h3>Add Quantity</h3>
                            {/* Quantity Input */}
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="quantity-input"
                                min="1"
                            />
                            {/* Unit Selector */}
                            <select onChange={(e) => setUnit(e.target.value)} value={unit} className="unit-selector">
                                <option value="">Select Unit</option>
                                <option value="whole">Whole Item(s)</option>  {/* New Option */}
                                <option value="grams">Grams</option>
                                <option value="cups">Cups</option>
                                <option value="tbsp">Tablespoons</option>
                                
                            </select>
                            {/* Submit and Close Buttons */}
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
                                    {item.quantity} 
                                     {item.unit === "whole" ? " item(s)" : ` ${item.unit}`} 
                                     of ingredient {item.productId}, 
                                     Calories: {item.totalCalories} kcal, 
                                     Protein: {item.protein}g, 
                                     Carbs: {item.carbs}g, 
                                     Fat: {item.fat}g
                                </li>
                            ))}
                        </ul>
                    </div>
        </div>
    );
}