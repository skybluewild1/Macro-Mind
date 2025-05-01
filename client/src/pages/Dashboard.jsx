import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import "./Dashboard.css"; // Importing CSS for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PieChartMacro from "../components/PieChartMacro"; // adjust path as needed

// function to calculate the user's unique maintenance calories using the Mifflin-St Jeor equation
function calcMaintCals(sex, weight, height, age, activity) {
    if (!sex) {
        console.error("Error: Sex is undefined or null.");
        return "Invalid gender input"; // Return early to avoid further errors
    }
    const normalizedSex = sex.trim().toLowerCase(); // Normalize input

    const kg = weight / 2.205;
    const cm = height * 2.54;

    if (normalizedSex === "male") {
        return activity * ((10 * kg) + (6.25 * cm) - (5 * age) + 5);
    } else if (normalizedSex === "female") {
        return activity * ((10 * kg) + (6.25 * cm) - (5 * age) - 161);
    } else {
        return "Invalid gender input"; // Handles errors
    }
}

export default function Dashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [calories, setCalories] = useState(0); // Total calorie count
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 }); // Macronutrient tracker
    const [maintenanceCalories, setMaintenanceCalories] = useState(null);

    console.log("Macros state:", macros);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    console.log("Fetched user:", data); // Debugging: Check full user object
                    setUser(data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []); // This useEffect only runs once

    // New useEffect: Recalculate `maintenanceCalories` when `user` updates
    useEffect(() => {
        if (user && user.sex && user.weight && user.height && user.age && user.activity) {
            const cals = calcMaintCals(user.sex, user.weight, user.height, user.age, user.activity);
            setMaintenanceCalories(Math.round(cals));
            console.log("Calculated Maintenance Calories:", cals);
        }
    }, [user]); // Runs every time `user` changes

    useEffect(() => {
        if (user) {
            const today = new Date().toISOString().split('T')[0];

            axios.get(`/api/calories/${user._id}/${today}`)
                .then(({ data }) => {
                    const entries = data.entries || [];

                    const totals = entries.reduce(
                        (acc, entry) => ({
                            protein: acc.protein + (entry.protein || 0),
                            carbs: acc.carbs + (entry.carbs || 0),
                            fat: acc.fat + (entry.fat || 0),
                            calories: acc.calories + (entry.calories || 0),
                        }),
                        { protein: 0, carbs: 0, fat: 0, calories: 0 }
                    );

                    setCalories(totals.calories);
                    setMacros({ protein: totals.protein, carbs: totals.carbs, fat: totals.fat });
                })
                .catch(err => console.error("Error loading daily calorie log:", err));
        }
    }, [user]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            {user ? (
                <div className="dashboard-content">
                    <div className="user-card">
                        <h2 className="greeting">Hi {user.username}!</h2>
                        <p className="user-info">You are all set to track your progress and goals.</p>

                        {/* Maintenance Calories */}
                        <div className="calorie-info">
                            <h3>Your Daily Maintenance Calories:</h3>
                            <p>{maintenanceCalories ? `${maintenanceCalories} cal/day` : "Loading..."}</p>
                        </div>

                        {/* Move buttons here */}
                        <div className="button-row">
                            <button onClick={() => navigate("/TrackCals")}>Track Your Calories</button>
                        </div>
                        <div className="button-row">
                            <button onClick={() => navigate("/Workouts")}>Your Workouts</button>
                        </div>
                    </div>

                    <div className="radial-slider-container">
                        <h2 className="radial-slider-title">Progress</h2>
                        <div className="macro-chart-wrapper">
                            <PieChartMacro macros={macros} />
                        </div>
                        <div className="macro-summary-box">
                            <p className="progress-info">Calories: {Math.round(calories)} / {maintenanceCalories}</p>
                            <p className="progress-info">Protein: {Math.round(macros.protein)}g</p>
                            <p className="progress-info">Carbs: {Math.round(macros.carbs)}g</p>
                            <p className="progress-info">Fat: {Math.round(macros.fat)}g</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="no-user">Please log in to see your dashboard.</p>
            )}
        </div>
    );
}
