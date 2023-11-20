const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const route = require('express').Router();

route.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPasswd = await bcrypt.compare(password, user.password);
        if (!matchPasswd) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ name: user.name, username: user.username, id: user._id });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

route.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const hashPasswd = await bcrypt.hash(password, 10);
        const poetry = await User.create({ name, username, password: hashPasswd });

        res.status(200).json(poetry);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = route;