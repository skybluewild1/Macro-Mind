const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Import User model

// Add premade workout to user
router.post('/savePremadeWorkout', async (req, res) => {
    const { userId, workoutId } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Prevent duplicates
        if (user.premadeWorkouts.includes(workoutId)) {
            return res.status(400).json({ message: 'Workout already saved' });
        }

        user.premadeWorkouts.push(workoutId);
        await user.save();

        res.json({ message: 'Workout saved successfully' });
    } catch (error) {
        console.error('Error saving workout:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/savedWorkouts/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('premadeWorkouts');  // Populates workout details

        res.json(user.premadeWorkouts);  // Send the populated workouts
    } catch (error) {
        console.error('Error fetching saved workouts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/removeSavedWorkout', async (req, res) => {
    const { userId, workoutId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Remove the workout ID from the premadeWorkouts array
        user.premadeWorkouts = user.premadeWorkouts.filter(id => id.toString() !== workoutId);
        await user.save();

        res.json({ message: 'Workout removed successfully' });
    } catch (error) {
        console.error('Error removing workout:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;