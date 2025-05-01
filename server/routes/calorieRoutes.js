const express = require('express');
const router = express.Router();
const DailyCalorie = require('../models/calories');

// Get today's calorie entries for a user
router.get('/calories/:userId/:date', async (req, res) => {
    const { userId, date } = req.params;
    const log = await DailyCalorie.findOne({ userId, date });
    if (!log) {
        return res.status(404).json({ message: "No log found" });
    }
    try {
        const record = await DailyCalorie.findOne({ userId, date });
        res.json(record || { userId, date, entries: [] });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

router.post('/calories/create', async (req, res) => {
    const { userId, date } = req.body;
  
    if (!userId || !date) {
      return res.status(400).json({ message: "Missing userId or date" });
    }
  
    try {
      const existing = await DailyCalorie.findOne({ userId, date });
      if (existing) {
        return res.status(409).json({ message: "Log already exists" });
      }
  
      const newLog = new DailyCalorie({
        userId,
        date,
        entries: [] // important: allow empty entries on creation
      });
  
      await newLog.save();
      res.status(201).json(newLog);
    } catch (err) {
      res.status(500).json({ message: "Error creating calorie log", error: err });
    }
});

// POST /api/calories/add - Add a new entry to an existing daily log
router.post('/calories/add', async (req, res) => {
    const { userId, date, entry } = req.body;
  
    if (!userId || !date || !entry || !entry.name || !entry.calories) {
      return res.status(400).json({ message: "Missing data in request" });
    }
  
    try {
      const log = await DailyCalorie.findOne({ userId, date });
      if (!log) {
        return res.status(404).json({ message: "Log not found" });
      }
  
      log.entries.push(entry);
      await log.save();
  
      res.status(200).json({ message: "Entry added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to add entry", error: err });
    }
});

// Remove an entry by index
router.post('/calories/remove', async (req, res) => {
  const { userId, date, index } = req.body;
  try {
    const record = await DailyCalorie.findOne({ userId, date });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record.entries.splice(index, 1);
    await record.save();
    res.json({ message: 'Entry removed', record });
  } catch (err) {
    res.status(500).json({ message: 'Error removing entry' });
  }
});

// Remove an entry
router.delete('/calories/:userId/:date/:entryId', async (req, res) => {
  const { userId, date, entryId } = req.params;

  try {
    const record = await DailyCalorie.findOne({ userId, date });
    if (!record) {
      return res.status(404).json({ message: 'Log not found' });
    }

    const entryIndex = record.entries.findIndex(e => e._id.toString() === entryId);
    if (entryIndex === -1) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    record.entries.splice(entryIndex, 1);
    await record.save();

    res.json({ message: 'Entry removed successfully' });
  } catch (err) {
    console.error('Error removing entry:', err);
    res.status(500).json({ message: 'Server error while removing entry' });
  }
});

module.exports = router;