const express = require("express");

const router = express.Router();

const {books} = require("../Data/books.json");
const {users} = require("../Data/user.json");
//Getting all books
const {
    getAllBooks,
    getBookById,
    AllissuedBooksByUser,
    addNewBook,
    issuedBookWithFine
} = require('../controllers/book-controller');

//Getting All Books
router.get("/", getAllBooks);

//Getting book by id
router.get("/:id", getBookById);

//Getting All Issued Books
router.get("/issued/by-user" ,AllissuedBooksByUser);

//Addind new books
router.post("/", addNewBook)

// Getting Issued Books With fine
router.get("/issued-book/withFine",issuedBookWithFine);
module.exports = router