const mongoose = require('mongoose');

const calorieEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: Number,
    carbs: Number,
    fat: Number
});
  
const dailyCalorieSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // e.g. '2024-07-31'
    entries: {
        type: [calorieEntrySchema],
        default: () => []  // ensures a clean empty array on creation
    }
});
  
const DailyCalorie = mongoose.model('DailyCalorie', dailyCalorieSchema);

module.exports = DailyCalorie;