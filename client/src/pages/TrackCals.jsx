import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
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
  const today = new Date().toISOString().split('T')[0]; // "2024-07-31"
  //const [logCreated, setLogCreated] = useState(false);
  const [logExists, setLogExists] = useState(false);
  const navigate = useNavigate();

  const fetchLog = async () => {
    try {
      const res = await axios.get(`/api/calories/${user._id}/${today}`);
      if (res.data && Array.isArray(res.data.entries)) {
        setUserProducts(res.data.entries);
        setLogExists(true);
      }
    } catch (err) {
      console.error("Failed to fetch updated log:", err);
    }
  };
  

  useEffect(() => {
    if (user) {
      axios.get(`/api/calories/${user._id}/${today}`)
        .then(res => {
          if (res.data && Array.isArray(res.data.entries)) {
            setUserProducts(res.data.entries);
            setLogExists(true);
          } else {
            // Edge case: unexpected response shape
            setUserProducts([]);
            setLogExists(false);
          }
        })
        .catch(err => {
          console.log("No log found or error:", err.response?.status);
          setUserProducts([]);
          setLogExists(false);  // ⬅️ This resets the UI correctly
        });
    }
  }, [user]);

  const [newEntry, setNewEntry] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const handleCreateLog = async () => {
    try {
      await axios.post('/api/calories/create', {
        userId: user._id,
        date: today
      });
      const res = await axios.get(`/api/calories/${user._id}/${today}`);
      setUserProducts(res.data.entries);
      setLogExists(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setLogExists(true);
      } else {
        alert("Failed to create log");
      }
    }
  };

  const handleAddManualEntry = () => {
    if (!newEntry.name || !newEntry.calories) {
      alert("Please enter at least name and calories.");
      return;
    }

    const entryPayload = {
      name: newEntry.name,
      calories: parseFloat(newEntry.calories),
      protein: parseFloat(newEntry.protein || 0),
      carbs: parseFloat(newEntry.carbs || 0),
      fat: parseFloat(newEntry.fat || 0)
    };

    axios.post('/api/calories/add', {
      userId: user._id,
      date: today,
      entry: entryPayload
    })
      .then(() => {
        fetchLog();
        setNewEntry({ name: '', calories: '', protein: '', carbs: '', fat: '' });
        toast.success("Entry added successfully!");
      })
      .catch(err => {
        console.error("Error adding entry:", err);
        alert("Failed to add entry.");
      });
  };

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

  const handleDeleteEntry = (entryId) => {
    axios.delete(`/api/calories/${user._id}/${today}/${entryId}`)
      .then(() => fetchLog())
      .catch(err => console.error("Failed to delete entry:", err));
  };
  

  const handleFoodSelect = async (ingredientId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=100&unit=grams&apiKey=44c64a1459da472185a7671b540fa583`
      );

      if (!response.ok) throw new Error("Failed to fetch ingredient details");

      const ingredientDetails = await response.json();

      const nutrition = ingredientDetails.nutrition.nutrients.reduce(
        (acc, nutrient) => {
          if (nutrient.name === "Calories") acc.calories = nutrient.amount;
          if (nutrient.name === "Fat") acc.fat = nutrient.amount;
          if (nutrient.name === "Carbohydrates") acc.carbs = nutrient.amount;
          if (nutrient.name === "Protein") acc.protein = nutrient.amount;
          return acc;
        },
        { calories: 0, fat: 0, carbs: 0, protein: 0 }
      );

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

    axios.post('/api/calories/add', {
      userId: user._id,
      date: today,
      entry: {
        name: selectedFood.foodName,
        calories: parseFloat(totalCalories),
        protein: parseFloat(totalProtein),
        carbs: parseFloat(totalCarbs),
        fat: parseFloat(totalFat)
      }
    })
    .then(() => {
      fetchLog();
      setQuantityModal(false); // ✅ close after successful save
    })
    .catch(err => {
      console.error("Error saving entry:", err);
      toast.error("Failed to add entry.");
    });

    // ✅ Update user context so dashboard can reflect totals
    setUser((prev) => ({
      ...prev,
      trackedNutrition: {
        calories:
          (prev.trackedNutrition?.calories || 0) + parseFloat(totalCalories),
        protein:
          (prev.trackedNutrition?.protein || 0) + parseFloat(totalProtein),
        carbs: (prev.trackedNutrition?.carbs || 0) + parseFloat(totalCarbs),
        fat: (prev.trackedNutrition?.fat || 0) + parseFloat(totalFat),
      },
    }));
  };

  return (
    <div className="track-cals-wrapper">
      <h1>Track Your Calories</h1>

      <section className="daily-log-section">
        <h2>Today's Calorie Log</h2>

        {logExists && userProducts.length > 0 ? (
          <ul className="calorie-log">
{userProducts.map((entry, idx) => (
  <li key={entry._id || idx}>
    <div className="entry-row">
      <div>
        <strong>{entry.name}</strong> – {entry.calories} kcal
        <div>
          Protein: {Math.round(entry.protein)}g | Carbs: {Math.round(entry.carbs)}g | Fat: {Math.round(entry.fat)}g
        </div>
      </div>
      <button
        onClick={() => handleDeleteEntry(entry._id)}
        className="delete-entry-button"
      >
        🗑
      </button>
    </div>
  </li>
))}

          </ul>
        ) : (
          <p>No entries yet. Start logging!</p>
        )}

        <button
          onClick={handleCreateLog}
          disabled={logExists}
          style={{
            backgroundColor: logExists ? '#ccc' : '#4CAF50',
            color: logExists ? '#666' : 'white',
            cursor: logExists ? 'not-allowed' : 'pointer',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            marginTop: '1rem'
          }}
        >
          {logExists ? "Log Started" : "Start Today's Calorie Log"}
        </button>

        {logExists && (
          <div className="entry-form">
            <h3>Add a Food Entry</h3>
            <input
              type="text"
              placeholder="Food Name"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Calories"
              value={newEntry.calories}
              onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={newEntry.protein}
              onChange={(e) => setNewEntry({ ...newEntry, protein: e.target.value })}
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={newEntry.carbs}
              onChange={(e) => setNewEntry({ ...newEntry, carbs: e.target.value })}
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={newEntry.fat}
              onChange={(e) => setNewEntry({ ...newEntry, fat: e.target.value })}
            />
            <button onClick={handleAddManualEntry}>Add Entry</button>
          </div>
        )}

      </section>

      <hr style={{ margin: '2rem 0' }} />

      {logExists && (
        <section className="food-search-section">
          <h2>Search for Ingredients</h2>
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
                <li key={food.id} className="food-item">
                  <strong>{food.name}</strong>
                  {food.image && (
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${food.image}`}
                      alt={food.name}
                    />
                  )}
                  <button
                    onClick={() => {
                      handleFoodSelect(food.id);
                      handleAddQuantity(food.id);
                    }}
                    className="add-quantity-button"
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          )}

          {selectedFood && (
            <div className="food-details">
              <h2>{selectedFood.foodName}</h2>
              <p><strong>Calories:</strong> {selectedFood.caloriesPerServing} kcal</p>
              <p><strong>Protein:</strong> {selectedFood.nutrition.protein}g</p>
              <p><strong>Carbs:</strong> {selectedFood.nutrition.carbs}g</p>
              <p><strong>Fat:</strong> {selectedFood.nutrition.fat}g</p>
            </div>
          )}
        </section>
      )}
      {
        quantityModal && (
          <div className="quantity-modal">
            <h3>Add Quantity</h3>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="quantity-input"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="unit-selector"
            >
              <option value="">Select Unit</option>
              <option value="whole">Whole Item(s)</option>
              <option value="grams">Grams</option>
              <option value="cups">Cups</option>
              <option value="tbsp">Tablespoons</option>
            </select>
            <button onClick={handleQuantitySubmit}>Add</button>
            <button onClick={() => setQuantityModal(false)}>Cancel</button>
          </div>
        )
      }
      <button
        onClick={() => navigate("/dashboard")}
        className="back-to-dashboard"
      >
        Back to Dashboard
      </button>
    </div >
  )
}
