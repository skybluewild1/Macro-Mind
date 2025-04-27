const mongoose = require('mongoose');

const preWorkoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    difficulty: String,
    exercises: [{
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },  // reference to Exercise collection
        sets: String,
        reps: String
    }]
}, { collection: 'PremadeWorkouts' });  // <-- force the collection name to match your DB

//module.exports = mongoose.model('PreWorkout', preWorkoutSchema);
module.exports = mongoose.model('PreWorkout', preWorkoutSchema);