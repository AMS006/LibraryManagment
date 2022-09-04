class IssuedBook{
    _id;
    name;
    author;
    price;
    issuedby;
    issuedOn;
    returnDate;

    constructor(user){
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.price = user.issuedBook.price;
        this.issuedby = user.name;
        this.issuedOn = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}
class BookWithFine{
    _id;
    name;
    author;
    price;
    publisher;
    
    constructor(book){
        this._id = book.id;
        this.name = book.name;
        this.author = book.author;
        this.price = book.price;
        this.publisher = book.publisher;
    }
}
module.exports = IssuedBook;
module.exports = BookWithFine;