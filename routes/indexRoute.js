const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const route = require('express').Router();
const jwt = require('jsonwebtoken');


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
            return res.render('login', { message: "Please fill all fields" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { message: "User not found" });
        }

        const matchPasswd = await bcrypt.compare(password, user.password);
        if (!matchPasswd) {
            return res.render('login', { message: "Invalid credentials" });
        }

        const token = jwt.sign({ name: user.name, username: user.username, id: user._id }, 'atysgsvsggffdddd');

        // Set the token in a cookie (you can also send it in the response body)
        res.cookie('token', token, { httpOnly: true });
        res.cookie('user', user.username);
        // console.log(req.originalUrl);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('login', { message: error.message });
    }
});


route.get('/logout', (req, res) => {

    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/login');
});


route.get('/signup', async (req, res) => {
    res.render('signup', { message: "" });
});

route.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.render('signup', { message: "Please fill all fields" });
        }
        const hashPasswd = await bcrypt.hash(password, 10);
        await User.create({ name, username, password: hashPasswd });

        res.redirect('/login');
    } catch (error) {
        res.render('signup', { message: error.message });
    }
});

module.exports = route;