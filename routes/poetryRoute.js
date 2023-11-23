const Poetry = require('../models/poetryModel');
const upload = require('../config/multer');
const checkAuth = require('../config/checkAuth');
const route = require('express').Router();

route.get('/', async (req, res) => {
    try {
        const poetry = await Poetry.find();

        res.render('poetry', { poetry });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.get('/upload', async (req, res) => {
    res.render('uploadPoetry');
});

route.post('/upload', upload.single('img'), checkAuth, async (req, res) => {
    try {
        const { title, authorId } = req.body;
        if (!title || !authorId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Please Select file" });
        }
        const imgUrl = req.file.filename;
        await Poetry.create({ title, imgUrl, authorId });

        res.redirect('/poetry');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;