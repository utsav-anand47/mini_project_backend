const Poetry = require('../models/poetryModel');
const upload = require('../config/multer');
const route = require('express').Router();

route.get('/', async (req, res) => {
    try {
        const poetry = await Poetry.find();

        res.status(200).json(poetry);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

route.post('/', upload.single('img'), async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        if (!title || !content || !authorId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const imgUrl = req.file.path;
        const poetry = await Poetry.create({ title, content, imgUrl, authorId });

        res.status(200).json(poetry);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = route;