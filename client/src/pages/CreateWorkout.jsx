import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import './createWorkout.css';
import { useNavigate } from 'react-router-dom';

export default function CreateWorkout() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState('');
    const { user } = useContext(UserContext);
    const [showExercises, setShowExercises] = useState(false);
    const [customExercise, setCustomExercise] = useState({ name: '', sets: '', reps: '' });
    const [showCustomExerciseForm, setShowCustomExerciseForm] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');

    useEffect(() => {
        axios.get('/api/exercises')
            .then(({ data }) => setExercises(data))
            .catch(err => console.error('Error fetching exercises:', err));
    }, []);

    const handleAddExercise = (exercise) => {
        setSelectedExercises([...selectedExercises, { ...exercise, sets: '', reps: '' }]);
    };

    const handleRemoveExercise = (index) => {
        const updated = [...selectedExercises];
        updated.splice(index, 1);
        setSelectedExercises(updated);
    };

    const handleSetDetails = (index, field, value) => {
        const updated = [...selectedExercises];
        updated[index][field] = value;
        setSelectedExercises(updated);
    };

    const handleSaveWorkout = () => {
        if (!workoutName.trim()) {
            setErrorMessage('Please enter a workout name.');
            return;
        }
        if (selectedExercises.length === 0) {
            setErrorMessage('Please add at least one exercise.');
            return;
        }
    
        setErrorMessage('');  // Clear error if valid
    
        axios.post('/api/saveCustomWorkout', {
            userId: user._id,
            workoutName,
            description: workoutDescription,
            exercises: selectedExercises.map(ex => ({
                name: ex.Name || ex.name,  // handles both db & custom exercises
                sets: ex.sets,
                reps: ex.reps
            }))
        })
        .then(() => {
            alert('Workout saved!');
            navigate('/workouts');
        })
        .catch(err => {
            console.error('Error saving workout:', err);
            setErrorMessage('Failed to save workout. Please try again.');
        });
    };

    return (
        <div className="create-workout-container">
            <h2>Create New Workout</h2>
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Input Workout Name" 
                    value={workoutName} 
                    onChange={(e) => setWorkoutName(e.target.value)} 
                    className="workout-name-input"
                />
                <textarea 
                    placeholder="Input Workout Description" 
                    value={workoutDescription} 
                    onChange={(e) => setWorkoutDescription(e.target.value)} 
                    className="workout-description-input"
                    rows={4}
                />
            </div>

            <div className="button-row">
                <button 
                    onClick={() => setShowExercises(!showExercises)} 
                    className="browse-btn"
                >
                    {showExercises ? 'Hide Exercises' : 'Browse Exercises'}
                </button>
            
                <button 
                    onClick={() => setShowCustomExerciseForm(!showCustomExerciseForm)} 
                    className="browse-btn"
                >
                    {showCustomExerciseForm ? 'Cancel Custom Exercise' : 'Add Custom Exercise'}
                </button>
            </div>

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
                    <button 
                        onClick={() => {
                            setSelectedExercises([...selectedExercises, { ...customExercise }]);
                            setCustomExercise({ name: '', sets: '', reps: '' });
                            setShowCustomExerciseForm(false);
                        }}
                        className="add-btn"
                    >
                        Add to Workout
                    </button>
                </div>
            )}

            {showExercises && (
                <div className="exercise-list">
                    {exercises.map((ex) => (
                        <div key={ex._id} onClick={() => handleAddExercise(ex)} className="exercise-card">
                            <strong>{ex.Name}</strong>
                            <p>{ex.MuscleGroups.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}



            <h3>Selected Exercises</h3>
            {selectedExercises.map((ex, idx) => (
                <div key={idx} className="selected-exercise">
                    <strong>{ex.Name || ex.name}</strong>
                    <input 
                        type="number" 
                        placeholder="Sets" 
                        value={ex.sets} 
                        onChange={(e) => handleSetDetails(idx, 'sets', e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder="Reps" 
                        value={ex.reps} 
                        onChange={(e) => handleSetDetails(idx, 'reps', e.target.value)} 
                    />
                    <button onClick={() => handleRemoveExercise(idx)} className="remove-btn">X</button>
                </div>
            ))}

            <button 
                onClick={handleSaveWorkout}
                style={{
                    backgroundColor: (!workoutName.trim() || selectedExercises.length === 0) ? 'gray' : '#4CAF50',
                    cursor: (!workoutName.trim() || selectedExercises.length === 0) ? 'not-allowed' : 'pointer',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    border: 'none'
                }}
            >
                Save Workout
            </button>

            {errorMessage && (
                <p style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage}</p>
            )}

            <button 
                onClick={() => navigate('/workouts')} 
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
                Back to Workouts
            </button>
        </div>
    );
}