import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./premade.css";

export default function PremadeWorkoutDetails() {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        axios.get(`/api/premadeWorkouts/${id}`)
            .then(({ data }) => setWorkout(data))
            .catch(err => console.error('Error fetching workout:', err));
    }, [id]);

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
        </div>
    );
}