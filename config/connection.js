const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on("connected", () => {
        console.log("Connected to database sucessfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error while connecting to database :" + err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongodb connection disconnected");
    });
};

module.exports = dbConnect;