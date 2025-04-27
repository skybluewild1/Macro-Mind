import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import "./premade.css";

export default function PremadeWorkoutDetails() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const { user, setUser } = useContext(UserContext);  // Get current user
    const navigate = useNavigate();

    let isSaved = false;
    if (user && workout) {
        isSaved = user.premadeWorkouts.includes(workout._id);
    }

    useEffect(() => {
        axios.get(`/api/premadeWorkouts/${id}`)
            .then(({ data }) => setWorkout(data))
            .catch(err => console.error('Error fetching workout:', err));
    }, [id]);

    const handleSaveWorkout = () => {
        axios.post('/api/savePremadeWorkout', {
            userId: user._id,
            workoutId: workout._id
        })
        .then(res => {
            alert(res.data.message);
            // Refetch user profile
            axios.get('/profile')
                .then(({ data }) => setUser(data));  // Update context with fresh user data
        })
        .catch(err => console.error('Error saving workout:', err));
    };

    const handleRemoveWorkout = () => {
        axios.post('/api/removeSavedWorkout', {
            userId: user._id,
            workoutId: workout._id
        })
        .then(res => {
            alert(res.data.message);
            // Optionally redirect back to saved workouts page:
            navigate('/workouts');
        })
        .catch(err => console.error('Error removing workout:', err));
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <div className="workout-details">
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            <p><strong>Difficulty:</strong> {workout.difficulty}</p>
            <h3>Exercises:</h3>
            <ul className="exercise-list">
                {workout.exercises.map((ex, idx) => (
                    <li key={idx}>
                        <strong>{ex.exercise.Name}</strong> <br />
                        Sets: {ex.sets} | Reps: {ex.reps}
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button 
                    onClick={handleSaveWorkout} 
                    disabled={isSaved}
                    style={{ 
                        backgroundColor: isSaved ? 'gray' : 'green',
                        cursor: isSaved ? 'not-allowed' : 'pointer',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        border: 'none'
                    }}
                >
                    {isSaved ? 'Workout Saved' : 'Add to My Workouts'}
                </button>

                {isSaved && (
                    <button 
                        onClick={handleRemoveWorkout}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '5px',
                            border: 'none'
                        }}
                    >
                        Remove from My Workouts
                    </button>
                )}
            </div>
            
        </div>
    );
}
