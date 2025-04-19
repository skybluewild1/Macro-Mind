import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./TrackCals.css";

export default function TrackCals() {
    const { user, setUser } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [foodResults, setFoodResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantityModal, setQuantityModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [userProducts, setUserProducts] = useState([]);

    const handleSearchSubmit = async () => {
        if (!query) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=5&apiKey=44c64a1459da472185a7671b540fa583`
            );

            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            const data = await response.json();
            setFoodResults(data.results);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFoodSelect = async (ingredientId) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=100&unit=grams&apiKey=44c64a1459da472185a7671b540fa583`
            );

            if (!response.ok) throw new Error("Failed to fetch ingredient details");

            const ingredientDetails = await response.json();

            const nutrition = ingredientDetails.nutrition.nutrients.reduce((acc, nutrient) => {
                if (nutrient.name === "Calories") acc.calories = nutrient.amount;
                if (nutrient.name === "Fat") acc.fat = nutrient.amount;
                if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
                if (nutrient.name === "Protein") acc.protein = nutrient.amount;
                return acc;
            }, { calories: 0, fat: 0, carbs: 0, protein: 0 });

            const caloriesPerServing = nutrition.calories;

            setSelectedFood({
                foodName: ingredientDetails.name,
                foodImage: ingredientDetails.image,
                foodUrl: "",
                nutrition: nutrition,
                servingSize: 100,
                caloriesPerServing,
            });

        } catch (error) {
            console.error("Error selecting food:", error);
        }
    };

    const handleAddQuantity = (ingredientId) => {
        setSelectedProductId(ingredientId);
        setQuantityModal(true);
    };

    const handleQuantitySubmit = () => {
        if (!selectedFood || !quantity || !unit) return;

        const baseCalories = selectedFood.caloriesPerServing;
        const baseMacros = selectedFood.nutrition;

        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        const factor = parseFloat(quantity);
        if (unit === "whole") {
            totalCalories = baseCalories * factor;
            totalProtein = baseMacros.protein * factor;
            totalCarbs = baseMacros.carbs * factor;
            totalFat = baseMacros.fat * factor;
        } else {
            totalCalories = baseCalories * (factor / 100);
            totalProtein = baseMacros.protein * (factor / 100);
            totalCarbs = baseMacros.carbs * (factor / 100);
            totalFat = baseMacros.fat * (factor / 100);
        }

        const newProduct = {
            productId: selectedFood.foodName,
            quantity,
            unit,
            totalCalories: totalCalories.toFixed(2),
            protein: totalProtein.toFixed(2),
            carbs: totalCarbs.toFixed(2),
            fat: totalFat.toFixed(2),
        };

        setUserProducts((prev) => [...prev, newProduct]);
        setQuantity("");
        setUnit("");
        setQuantityModal(false);

        // ✅ Update user context so dashboard can reflect totals
        setUser((prev) => ({
            ...prev,
            trackedNutrition: {
                calories: (prev.trackedNutrition?.calories || 0) + parseFloat(totalCalories),
                protein: (prev.trackedNutrition?.protein || 0) + parseFloat(totalProtein),
                carbs: (prev.trackedNutrition?.carbs || 0) + parseFloat(totalCarbs),
                fat: (prev.trackedNutrition?.fat || 0) + parseFloat(totalFat),
            }
        }));
    };

    return (
        <div>
            <h1>Search Page</h1>

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

                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}

                {foodResults.length > 0 && (
                    <ul className="food-results">
                        {foodResults.map((food) => (
                            <li key={food.id} className="food-item" style={{ cursor: "pointer" }}>
                                <strong>{food.name}</strong>
                                {food.image && (
                                    <img
                                        src={`https://spoonacular.com/cdn/ingredients_100x100/${food.image}`}
                                        alt={food.name}
                                    />
                                )}
                                <button onClick={() => { handleFoodSelect(food.id); handleAddQuantity(food.id); }} className="add-quantity-button">+</button>
                            </li>
                        ))}
                    </ul>
                )}

                {selectedFood && (
                    <div className="food-details">
                        <h2>{selectedFood.foodName}</h2>
                        {selectedFood.foodImage && (
                            <img
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${selectedFood.foodImage}`}
                                alt={selectedFood.foodName}
                            />
                        )}
                        <p><strong>Calories per Serving:</strong> {selectedFood.caloriesPerServing} kcal</p>
                        <p><strong>Fat:</strong> {selectedFood.nutrition.fat} g</p>
                        <p><strong>Carbs:</strong> {selectedFood.nutrition.carbs} g</p>
                        <p><strong>Protein:</strong> {selectedFood.nutrition.protein} g</p>
                        <a href={selectedFood.foodUrl} target="_blank" rel="noopener noreferrer">More info</a>
                    </div>
                )}
            </div>

            {quantityModal && (
                <div className="quantity-modal">
                    <h3>Add Quantity</h3>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="quantity-input"
                        min="1"
                    />
                    <select onChange={(e) => setUnit(e.target.value)} value={unit} className="unit-selector">
                        <option value="">Select Unit</option>
                        <option value="whole">Whole Item(s)</option>
                        <option value="grams">Grams</option>
                        <option value="cups">Cups</option>
                        <option value="tbsp">Tablespoons</option>
                    </select>
                    <button onClick={handleQuantitySubmit} className="submit-quantity-button">Add Quantity</button>
                    <button onClick={() => setQuantityModal(false)} className="close-modal-button">Close</button>
                </div>
            )}

            <div>
                <h2>Your Added Products</h2>
                <ul>
                    {userProducts.map((item, index) => (
                        <li key={index}>
                            {item.quantity} {item.unit === "whole" ? "item(s)" : item.unit} of <strong>{item.productId}</strong> – 
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
