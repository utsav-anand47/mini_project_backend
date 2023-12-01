
const upload = require('../config/multer');
const checkAuth = require('../config/checkAuth');
const Quote = require('../models/quoteModel');
const route = require('express').Router();

route.get('/', async (req, res) => {
    try {
        const quote = await Quote.find().populate('authorId');

        res.render('quote', { quote });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.get('/upload', checkAuth, async (req, res) => {
    res.render('uploadQuote');
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
        await Quote.create({ title, imgUrl, authorId });

        res.redirect('/quote');
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;