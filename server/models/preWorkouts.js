const mongoose = require('mongoose');
const { Schema } = mongoose;

const premadeWorkoutSchema = new Schema({
    name: String,
    description: String,
    difficulty: String,
    exercises: [
        {
          exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
          },
          sets: String,
          reps: String
        }
      ]
});

const preWorkoutsModel = mongoose.model('preWorkouts', premadeWorkoutSchema);
module.exports = preWorkoutsModel;
