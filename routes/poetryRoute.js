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

route.get('/upload', checkAuth, async (req, res) => {
    res.render('uploadPoetry');
});

route.post('/upload', checkAuth, upload.single('img'), async (req, res) => {
    try {
        const { title } = req.body;
        const authorId = req.user.id;
        if (!title || !authorId) {
            return res.status(400).send("Please fill all fields");
        }
        if (!req.file) {
            return res.status(400).send("Please Select file");
        }
        const imgUrl = 'uploads/' + req.file.filename;
        await Poetry.create({ title, imgUrl, authorId });

        res.redirect('/poetry');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;