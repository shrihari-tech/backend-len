const express = require('express');
const router = express.Router();
const User = require('../Schema/User');
const Book = require('../Schema/Book');

router.post('/add', async (req, res) => {
    const { title, user } = req.body;
    const book = new Book({
        title,
        user
    });
    await book.save();
    res.json({ message: 'Book added successfully' });
})

router.get('/getByUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const books = await Book.find({ user: userId }).populate('user', 'name email');
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found for this user" });
        }
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;