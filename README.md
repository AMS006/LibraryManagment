# BackEnd For Library Managment App

## Routes

# /users 

 1. GET : Get all list of user
 2. Post : Create a new user

# users/{id}

 1. GET : Get a user by Id
 2. PUT : Updata a user by id
 3. DELETE : Delete a user by id (if user have a issued book and check for fines)

# users/subcription/{id}

1. GET : Get a user subscription (Data of subscription , Valid till , Fine if any)

# Books Routes

# /Books

1. GET : Get all books
2. POST : Create/Add new book

# Books/{id}

1. GET : Get a book by id
2. PUT : Update a book by id

# books/issued

1. GET : Get all issued books

# books/issude/fine

1. GET : Get all issued books with fine

# Subscription Types

1. Basic(3 months)
2. Standard(6 months)
3. Premius (12 months)

