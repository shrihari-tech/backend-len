const express = require('express');
const router = express.Router();
const Task = require('../Schema/Task');
const User = require('../Schema/User');

router.post('/add', async (req, res) => {
    const { title, description, status, priority, createdBy } = req.body;
    const task = new Task({
        title,
        description,
        status,
        priority,
        createdBy
    });
    await task.save();
    res.json({ message: 'Task added successfully' });
})

router.get('/get', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/get/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await Task.find({ createdBy: userId }).populate('createdBy', 'name email');
        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;