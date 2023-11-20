const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const poetryRoute = require('./routes/poetryRoute');
const quoteRoute = require('./routes/quoteRoute');

// file imports
const dbConnect = require('./config/connection')

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to DB
dbConnect()

// Routes
app.use("/api/user", userRoute);
app.use("/api/poetry", poetryRoute);
app.use("/api/quote", quoteRoute);
app.use('/public', express.static(__dirname + '/public'))



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});