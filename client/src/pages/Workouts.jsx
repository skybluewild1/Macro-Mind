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
    const [savedPremadeWorkouts, setSavedPremadeWorkouts] = useState([]);
    const [customWorkouts, setCustomWorkouts] = useState([]);

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
            axios.get(`/api/savedWorkouts/${user._id}`)
                .then(({ data }) => {
                    setSavedPremadeWorkouts(data.premadeWorkouts);
                    setCustomWorkouts(data.customWorkouts);
                })
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
            {/* Premade Workouts */}
            <div className="section">
                <h3>Your Saved Premade Workouts</h3>
                    <div className="workouts-grid">
                    {savedPremadeWorkouts.length ? savedPremadeWorkouts.map(workout => (
                        <div key={workout._id} className="workout-card" onClick={() => navigate(`/premade-workouts/${workout._id}`)} style={{ cursor: 'pointer' }}>
                            <h4>{workout.name}</h4>
                                <p>{workout.description}</p>
                        </div>
                    )) : <p>No saved premade workouts yet.</p>}
                </div>
            </div>

            {/* Custom Workouts */}
            <div className="section">
                <h3>Your Custom Workouts</h3>
                <div className="workouts-grid">
                {customWorkouts.length ? customWorkouts.map((workout, idx) => (
                    <div 
                        key={workout._id} 
                        className="workout-card" 
                        onClick={() => navigate(`/custom-workouts/${user._id}/${workout._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h4>{workout.name}</h4>
                        {workout.description && <p style={{ marginTop: '0.5rem' }}>{workout.description}</p>}
                    </div>
                )) : <p>No custom workouts yet.</p>}
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
            <button 
                onClick={() => navigate('/dashboard')} 
                style={{
                    position: 'fixed', 
                    bottom: '20px', 
                    right: '20px',
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '25px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}