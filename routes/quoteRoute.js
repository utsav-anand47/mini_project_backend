const route = require('express').Router();
const Quote = require('../models/quoteModel');
const upload = require('../config/multer');


route.get('/', async (req, res) => {
    try {
        const poetry = await Quote.find();

        res.status(200).json(poetry);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

route.post('/', upload.single('img'),  async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        if (!title || !content || !authorId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const imgUrl = req.file;

        const poetry = await Quote.create({ title, content, imgUrl, authorId });

        res.status(200).json(poetry);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = route;
