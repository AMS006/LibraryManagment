const mongoose = require("mongoose");

function Dbconnection(){
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL);
    const db = mongoose.connection;

    db.on("error", console.error.bind('console',"Connection Error"));
    db.once("open", function(){
        console.log("Data Base Connected");
    })
}

module.exports = Dbconnection