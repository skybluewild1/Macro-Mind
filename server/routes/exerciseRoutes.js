const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');  // Import the Exercise model

// GET all exercises
router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();  // Fetch all exercises
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Optional: GET single exercise by ID
router.get('/exercises/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
        res.json(exercise);
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET exercises by muscle group
router.get('/exercises/muscle/:group', async (req, res) => {
    const muscleGroup = req.params.group;
    try {
      const exercises = await Exercise.find({ MuscleGroups: muscleGroup });
      res.json(exercises);
    } catch (error) {
      console.error('Error fetching exercises for muscle group:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;