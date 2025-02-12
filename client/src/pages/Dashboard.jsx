import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./Dashboard.css"; // Importing CSS for styling

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        setResults([]);

        try {
            const response = await fetch(`http://localhost:8000/search/search?q=${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch food data");
            }
            const data = await response.json();
            setResults(data.foods?.food || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            {user ? (
                <div className="user-card">
                    <h2 className="greeting">Hi {user.username}!</h2>
                    <p className="user-info">You are all set to track your progress and goals.</p>

                    {/* Food Search Section */}
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
                            <button onClick={handleSearch} className="food-search-button">
                                Search
                            </button>
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p className="error-message">{error}</p>}

                        <ul className="food-results">
                            {results.map((food, index) => (
                                <li key={index} className="food-item">
                                    {food.food_name}
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
