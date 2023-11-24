const express = require('express');
const dbConnect = require('./config/connection');
const checkAuth = require('./config/checkAuth');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// Connect to DB
dbConnect()

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login', { message: '' });
});

app.get("/fun-games", (req, res) => {
    res.render('fungames');
});

app.use("/", require('./routes/indexRoute'));
app.use("/poetry", checkAuth, require('./routes/poetryRoute'));
app.use("/quote", require('./routes/quoteRoute'));
app.get("/game", (req, res) => {
    res.sendFile(__dirname + '/public/html/game.html');
});


const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});