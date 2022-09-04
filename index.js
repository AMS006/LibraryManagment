const express = require("express");
const dotenv = require("dotenv");
const port = 8081

const Dbconnection = require('./dbConnection')
const app = express();

dotenv.config();

Dbconnection();
app.use(express.json());

// Importing the Routes
const userRoute = require("./routes/users");
const booksRoute = require("./routes/books");


app.get("/", (req, res) => {
    res.status(200).send("Server is  Running");

});

app.use('/users' , userRoute);
app.use('/books', booksRoute);

app.get("*", (req, res) => {
    res.status(404).send("Request not found");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})