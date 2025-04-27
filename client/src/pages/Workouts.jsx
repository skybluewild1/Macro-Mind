import "./Workouts.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

export default function Workouts() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [showPremade, setShowPremade] = useState(false);
    const [premadeWorkouts, setPremadeWorkouts] = useState([]);

    // Fetch user profile
    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => setUser(data))
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [user]);

    // Fetch saved workouts
    useEffect(() => {
        if (user) {
            axios.get(`/api/savedWorkouts/${user._id}`)  // endpoint for saved workouts
                .then(({ data }) => setSavedWorkouts(data))
                .catch(error => console.error("Error fetching saved workouts:", error));
        }
    }, [user]);

    // Fetch premade workouts when browsing
    const handleBrowsePremade = () => {
        axios.get('/api/premadeWorkouts')
            .then(({ data }) => {
                setPremadeWorkouts(data);
                setShowPremade(true);
            })
            .catch(error => console.error("Error fetching premade workouts:", error));
    };

    console.log(premadeWorkouts);
    return (
        <div className="workouts-container">
            <h2>Welcome to your Workouts!</h2>

            {/* Action Buttons */}
            <div className="actions">
                <button onClick={handleBrowsePremade}>Browse Premade Workouts</button>
                <button onClick={() => navigate('/create-workout')}>Create New Workout</button>
            </div>

            {/* Saved Workouts */}
            <div className="section">
                <h3>Your Saved Workouts</h3>
                <div className="workouts-grid">
                {savedWorkouts.length ? savedWorkouts.map(workout => (
                    <div 
                        key={workout._id} 
                        className="workout-card" 
                        onClick={() => navigate(`/premade-workouts/${workout._id}`)}  // Navigate on click
                        style={{ cursor: 'pointer' }}
                    >
                        <h4>{workout.name}</h4>
                        <p>{workout.description}</p>
                    </div>
                )) : <p>No saved workouts yet.</p>}
                </div>
            </div>

            {/* Premade Workouts Modal */}
            {showPremade && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Premade Workouts</h3>
                        <button className="close-btn" onClick={() => setShowPremade(false)}>X</button>
                        <div className="workouts-grid">
                            {premadeWorkouts.map(workout => (
                                <div key={workout._id} className="workout-card" onClick={() => navigate(`/premade-workouts/${workout._id}`)} style={{ cursor: 'pointer' }}>
                                    <h4>{workout.name}</h4>                   {/* Workout Name */}
                                    <p>{workout.description}</p>               {/* Workout Description */}
                                    <p><strong>Difficulty:</strong> {workout.difficulty}</p>  {/* Difficulty */}
                                    <p><strong>Exercises:</strong> {workout.exercises.length}</p> {/* Number of Exercises */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}