import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import './custom.css';

export default function CustomWorkoutDetails() {
    const { userId, workoutId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [workout, setWorkout] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedWorkoutName, setEditedWorkoutName] = useState('');
    const [editedExercises, setEditedExercises] = useState([]);

    const [exercises, setExercises] = useState([]);
    const [showBrowseExercises, setShowBrowseExercises] = useState(false);
    const [showCustomExerciseForm, setShowCustomExerciseForm] = useState(false);
    const [customExercise, setCustomExercise] = useState({ name: '', sets: '', reps: '' });
    const [editedDescription, setEditedDescription] = useState('');

    useEffect(() => {
        if (user) {
            axios.get(`/api/customWorkouts/${userId}/${workoutId}`)
                .then(({ data }) => setWorkout(data))
                .catch(err => console.error('Error fetching custom workout:', err));
            axios.get('/api/exercises')
                .then(({ data }) => setExercises(data))
                .catch(err => console.error('Error fetching exercises:', err));
        }
    }, [userId, workoutId, user]);

    useEffect(() => {
        if (workout) {
            setEditedWorkoutName(workout.name);
            setEditedDescription(workout.description || '');
            setEditedExercises(workout.exercises.map(ex => ({ ...ex })));
        }
    }, [workout]);

    const handleRemoveWorkout = async () => {
        if (!window.confirm('Are you sure you want to delete this workout?')) return;

        try {
            await axios.post('/api/removeCustomWorkout', {
                userId: user._id,
                workoutId: workoutId
            });
            alert('Workout deleted successfully!');
            navigate('/workouts');
        } catch (err) {
            console.error('Error deleting workout:', err);
            alert('Failed to delete workout.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            await axios.post('/api/updateCustomWorkout', {
                userId: user._id,
                workoutId: workoutId,
                updatedWorkout: {
                    name: editedWorkoutName,
                    description: editedDescription, 
                    exercises: editedExercises,
                }
            });

            alert('Workout updated successfully!');
            setEditing(false);
            navigate('/workouts');
        } catch (err) {
            console.error('Error updating workout:', err);
            alert('Failed to update workout.');
        }
    };

    const handleAddExerciseFromBrowse = (exercise) => {
        setEditedExercises([...editedExercises, { name: exercise.Name, sets: '', reps: '' }]);
    };

    const handleAddCustomExercise = () => {
        if (!customExercise.name.trim()) {
            alert('Exercise name is required');
            return;
        }
        setEditedExercises([...editedExercises, customExercise]);
        setCustomExercise({ name: '', sets: '', reps: '' });
        setShowCustomExerciseForm(false);
    };

    if (!user) return <div>Loading user...</div>;
    if (!workout) return <div>Loading workout...</div>;

    return (
        <div>
            <div className="workout-details">
                {editing ? (
                    <>
                    <div className="input-group">
                        <input 
                            type="text"
                            value={editedWorkoutName}
                            onChange={(e) => setEditedWorkoutName(e.target.value)}
                            placeholder="Workout Name"
                            className="workout-name-input"
                    />
            </div>

            <div className="input-group">
                <textarea 
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Workout Description"
                    className="workout-description-textarea"
                    rows="4"
                />
            </div>

                        <div className="button-row">
                            <button className="browse-btn" onClick={() => setShowBrowseExercises(!showBrowseExercises)}>
                                {showBrowseExercises ? 'Hide Exercises' : 'Browse Exercises'}
                            </button>
                            <button className="browse-btn" onClick={() => setShowCustomExerciseForm(!showCustomExerciseForm)}>
                                {showCustomExerciseForm ? 'Cancel Custom Exercise' : 'Add Custom Exercise'}
                            </button>
                        </div>

                        {showBrowseExercises && (
                            <div className="exercise-list">
                                {exercises.map((ex) => (
                                    <div key={ex._id} className="exercise-card" onClick={() => handleAddExerciseFromBrowse(ex)}>
                                        <strong>{ex.Name}</strong>
                                        <p>{ex.MuscleGroups.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {showCustomExerciseForm && (
                            <div className="custom-exercise-form">
                                <input 
                                    type="text" 
                                    placeholder="Exercise Name" 
                                    value={customExercise.name}
                                    onChange={(e) => setCustomExercise({ ...customExercise, name: e.target.value })}
                                />
                                <input 
                                    type="number" 
                                    placeholder="Sets" 
                                    value={customExercise.sets}
                                    onChange={(e) => setCustomExercise({ ...customExercise, sets: e.target.value })}
                                />
                                <input 
                                    type="number" 
                                    placeholder="Reps" 
                                    value={customExercise.reps}
                                    onChange={(e) => setCustomExercise({ ...customExercise, reps: e.target.value })}
                                />
                                <button onClick={handleAddCustomExercise} className="add-btn">
                                    Add to Workout
                                </button>
                            </div>
                        )}

                        <h3>Exercises:</h3>
                        {editedExercises.map((ex, idx) => (
                            <div key={idx} className="selected-exercise">
                                <strong>{ex.name}</strong>
                                <input 
                                    type="number"
                                    value={ex.sets}
                                    onChange={(e) => {
                                        const updated = [...editedExercises];
                                        updated[idx].sets = e.target.value;
                                        setEditedExercises(updated);
                                    }}
                                    placeholder="Sets"
                                />
                                <input 
                                    type="number"
                                    value={ex.reps}
                                    onChange={(e) => {
                                        const updated = [...editedExercises];
                                        updated[idx].reps = e.target.value;
                                        setEditedExercises(updated);
                                    }}
                                    placeholder="Reps"
                                />
                            </div>
                        ))}

                        <div className="button-row">
                            <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
                            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>{workout.name}</h2>
                        {workout.description && <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{workout.description}</p>}
                        <h3>Exercises:</h3>
                        <ul className="exercise-list">
                            {workout.exercises.map((ex, idx) => (
                                <li key={idx}>
                                    <strong>{ex.name}</strong> <br />
                                    Sets: {ex.sets} | Reps: {ex.reps}
                                </li>
                            ))}
                        </ul>

                        <div className="button-row">
                            <button className="edit-btn" onClick={() => setEditing(true)}>Edit Workout</button>
                            <button className="remove-btn" onClick={handleRemoveWorkout}>Remove Workout</button>
                        </div>
                    </>
                )}

                <button 
                    onClick={() => navigate('/workouts')} 
                    style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '0.75rem 1.5rem', borderRadius: '25px', backgroundColor: '#4CAF50', color: 'white', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                >
                    Back to Workouts
                </button>
            </div>
        </div>
    );
}
