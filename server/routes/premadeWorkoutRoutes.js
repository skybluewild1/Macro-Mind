const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');  // <-- Import the Exercise model
const PreWorkout = require('../models/preWorkouts');  // Adjust path if needed

// GET all premade workouts
router.get('/premadeWorkouts', async (req, res) => {
    try {
        console.log('Hitting premade workouts route');
        const workouts = await PreWorkout.find();  // Use PreWorkout here
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching premade workouts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/premadeWorkouts/:id', async (req, res) => {
    try {
        const workout = await PreWorkout.findById(req.params.id)
            .populate({
                path: 'exercises.exercise',
                model: 'Exercise'
            });  // <-- Add this exact structure

        res.json(workout);
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
