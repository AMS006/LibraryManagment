A Library-Record Managment API with Backend for managining users and books in Library

## Routes

# /Users

 GET : Get all list of user
 Post : Create a new user

# users/{id}

 GET : Get a user by Id
 PUT : Updata a user by id
 DELETE : Delete a user by id (if user have a issued book and check for fines)

# users/subcription/{id}

 GET : Get a user subscription (Data of subscription , Valid till , Fine if any)

# /Books

 GET : Get all books
 POST : Create/Add new book

# Books/{id}

 GET : Get a book by id
 PUT : Update a book by id

# books/issued

 
 GET : Get all issued books

# books/issude/fine

GET : Get all issued books with fine

# Subscription Types

 Basic(3 months)
 Standard(6 months)
 Premius (12 months)

