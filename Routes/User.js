const express = require('express');
const router = express.Router();
const User = require('../Schema/User');

router.post('/register', async (req, res) => {
    const {name,email} = req.body;
    const user = new User({
        name,
        email
    });
    await user.save();
    res.json({message: 'User registered successfully'});
})

router.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;