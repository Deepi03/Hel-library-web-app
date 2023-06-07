
# Hel Library(Online Web app for library)

### Live Link

Please bear with me,the app takes few minutes to load data as I am using free hosting website to deploy my server.
 
`https://hel-library-web-app.netlify.app/`

#### This application has

    * CRUD operations on books,authors,genres by authorised admin
    * Fetch All books, genres and authors
    * Borrow book/Return book endpoints
    * Transaction history based on authorised admin/user

### What I learnt from this
    How to integrate front end with backend
    How redux works and managing states globally 
    How to design and style react app using material UI
    How to layer components and make it more reusable 
    how different functional component communicates each other

## Prerequisite
 #### Following tools required,
    * node v18.10
    * npm 9.1.2

## To start application in local
Run `git clone https://github.com/Deepi03/Hel-library-web-app.git`

Run `npm install` 

Run `npm run dev`

service should start in `http://localhost:5173`

=================================================

## Over view
* list of genres and its corresponding books in the home page

* list of authors in table view along with its corresponding books and informations of authors

* sort books based on title(a-z),availablity and authors based on name
* search for genres
* Under the book tab list of books and and its corresponding author can be viewed.If a visitor is logged in  as an USER with a unique USERNAME and PASSWORD, the user can borrow  any number available books from the book table it self or the user can chhose the return days and borrow a book from its detialed view.

* A borrowed book (which is in transaction) will not be available for the other users.
   
* Logged in user can view his/her own transaction history from the profile also able to return books.Once the book is returned it will be avaialble to other users.

### Login / Sign Up

In login form user has to provide his/her username and password to be logged in

To SignUp User has to click the toggle button to make the login form as singup form
   and provide new and unique username and password


#### ADMIN USER

Admin User has special privilege to make crud operations on Books and Authors.
   When you arw logged in as Admin.You are able to
     
###### Book
     
* Add Book by providing unique ISBN , Title, choose author and genre , publisher, published date , book cover(direct image url from third party website) , published date and description.

* Update each book by changing any of the book properties

* delete the book if it is not in transaction

###### Author

* Add Author by providing unique name , author image(direct image url from third party website) and inofrmation about author

* Update each author by changing any of the author properties

* delete the author if it is not mapped to book

###### Profile

* In profile page admin can view all other users transaction history and delete when the returned book transaction when it is not needed.
* Also in his/her own transaction he/she can view his/her own transactions and able to return books


### Potential plan
 
* more clean code with good documentation
* implement search for books ans authors as well
* better UI and mobile view
* better validations and exception handling
* bs there is no space for unit testing , planning to implement integration and e2e testing


### Back Note

Please follow the given link to view my backend service for this app 

 `https://github.com/Deepi03/Hel-Library-Backend-Service.git`



### Admin Credential can be requested to this email / linkedIn Dm
  
email : `deepirajsekar03@gmail.com`

LinkedIn profile : https://www.linkedin.com/in/deepika-rajasekar/






    
    