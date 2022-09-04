const {bookModal,userModal} = require('../Models/index');
const {IssuedBook,BookWithFine} = require('../dtos/book-dto');

exports.getAllBooks = async (req,res) =>{
    const books = await bookModal.find();

    if(books.length === 0)
       return  res.status(404).send("No Book Find");
    
    return res.status(200).json({
        success: true,
        "Data": books
    });
}
exports.getBookById = async (req,res) =>{
    const { id } = req.params;

    const book = await bookModal.findById(id);

    if(!book)
     return res.status(404).send("No book Found ");
    
     return res.status(200).json({
        "success":true,
        "Data": book
     })
}

exports.AllissuedBooksByUser = async (req,res) =>{
   
    const users = await userModal.find({issuedBook : {$exists: true}}).populate("issuedBook");

    const issuedBook = users.map((each) => new IssuedBook(each));

    if(issuedBook.length == 0){
       return res.status(404).send("No Issued books");
    }

    return res.status(200).json({
        "message" : "All Issued books",
        "data" : issuedBook
    });
}
exports.addNewBook = async (req,res) =>{
    const {data} = req.body;
    if(!data)
      return res.status(404).send("No Data Entered");
    
    await bookModal.create(data);

    const allbooks = await bookModal.find();

    return res.status(200).json({
        "message" : "Data Added Succefully",
        "Data": allbooks
    })
}
exports.issuedBookWithFine = async (req,res) =>{
    let issuedBookUser = userModal.find({issuedBook : {$exists:true}}).populate("issuedBook");
    let totalFine = 0;
    const getInDays = (data = "") =>{
        let date;
        if(data === "")
            date = new Date();
        else
            date = new Date(data);
        
        let days = Math.floor(date/(1000*60*60*24));

        return days;
    }
    const subscriptionDays = (date) =>{
        if(issuedBookUser.subscriptionType === "Basic")
            date += 90
        else if(issuedBookUser.subscriptionType === "Standard")
            date += 180
        else if(issuedBookUser.subscriptionType === "Premium")
            date += 365;

        return date;
    }        

    const currentdate = getInDays();
    const returnDate = getInDays(issuedBookUser.returnDate);
    const subscriptionDate = getInDays(issuedBookUser.subscriptionDate);
    const subscriptionExpiration = subscriptionDays(subscriptionDate);
    // console.log(currentdate,subscriptionExpiration)
    totalFine += returnDate < currentdate ?
                subscriptionExpiration <=currentdate ?
                200 : 100 :0;            
 
    const bookWithFine = (await issuedBookUser).map((each)=> new BookWithFine(each));
    const addedtotalFine = {
        ...bookWithFine,
        "TotalFine" : totalFine
    }
    res.status(200).json({
        "Status":success,
        "Data": addedtotalFine
    })
}