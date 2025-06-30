const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const user = await User.create({ name, email, password });
        res.json({ message: 'User registered', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
