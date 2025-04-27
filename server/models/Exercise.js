const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    Name: String,         // Match the field names in your Exercise collection
    Type: String,
    MuscleGroups: [String],
    Style: String,
    Sets: String,
    Reps: String,
    Difficulty: String,
    Description: String,
    Equipment: String,
    Link: String
}, { collection: 'Exercise' });  // <-- Match your collection name exactly (if needed)

module.exports = mongoose.model('Exercise', exerciseSchema);