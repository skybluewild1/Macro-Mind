const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    sex: String,
    weight: Number,
    height: Number,
    workoutStyle: [String],
    goals: [String],
    equipment: [String],
    level: String,
    diet: [String],
    activity: Number,
    premadeWorkouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreWorkout'
    }],
    customWorkouts: [{
        name: {
            type: String,
            required: true  // Enforce workout name
        },
        description: { type: String },
        exercises: [{
            name: String, // or exerciseId: ObjectId
            sets: Number,
            reps: Number
        }]
    }]
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;