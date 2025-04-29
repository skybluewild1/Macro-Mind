import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./premade.css";

export default function PremadeWorkoutDetails() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const { user, setUser } = useContext(UserContext); // Get current user
  const navigate = useNavigate();

  let isSaved = false;
  if (user && workout) {
    isSaved = user.premadeWorkouts.includes(workout._id);
  }

  useEffect(() => {
    axios
      .get(`/api/premadeWorkouts/${id}`)
      .then(({ data }) => setWorkout(data))
      .catch((err) => console.error("Error fetching workout:", err));
  }, [id]);

  const handleSaveWorkout = () => {
    axios
      .post("/api/savePremadeWorkout", {
        userId: user._id,
        workoutId: workout._id,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/workouts"); // Redirect after saving
      })
      .catch((err) => console.error("Error saving workout:", err));
  };

  const handleRemoveWorkout = () => {
    axios
      .post("/api/removeSavedWorkout", {
        userId: user._id,
        workoutId: workout._id,
      })
      .then((res) => {
        alert(res.data.message);
        // Optionally redirect back to saved workouts page:
        navigate("/workouts");
      })
      .catch((err) => console.error("Error removing workout:", err));
  };

  if (!workout) return <div>Loading...</div>;

  return (
    <div className="premade-workout-container">
      <div className="workout-details">
        <h2>{workout.name}</h2>
        <p>{workout.description}</p>
        <p>
          <strong>Difficulty: </strong>
          <span
            className={`difficulty-badge ${workout.difficulty.toLowerCase()}`}
          >
            {workout.difficulty}
          </span>
        </p>

        <ul className="exercise-list">
          {workout.exercises.map((ex, idx) => (
            <li key={idx} className="exercise-item">
              <div className="exercise-name">{ex.exercise.Name}</div>
              <div className="exercise-sets-reps">
                Sets: {ex.sets} | Reps: {ex.reps}
              </div>
            </li>
          ))}
        </ul>

        <div className="workout-buttons">
          <button
            onClick={handleSaveWorkout}
            disabled={isSaved}
            className={`action-button add-button ${isSaved ? "disabled" : ""}`}
          >
            {isSaved ? "Workout Saved" : "Add to My Workouts"}
          </button>

          {isSaved && (
            <button
              onClick={handleRemoveWorkout}
              className="action-button remove-button"
            >
              Remove from My Workouts
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
