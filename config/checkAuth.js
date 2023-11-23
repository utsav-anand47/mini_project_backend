const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = req?.cookies?.token;
    if (!token) return res.redirect('/login'); // Redirect to login if no token

    try {
        const decoded = jwt.verify(token, 'atysgsvsggffdddd');

        req.body.authorId = decoded?.id;
        next();
    } catch (err) {
        res.send(err.message); // Redirect to login on token verification failure
        console.log(err.message); // Redirect to login on token verification failure
    }
}