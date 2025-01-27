const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 // Assuming you want to register a user, you might receive user data from req.body
 const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Both username and password are required"
    });
  }

  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }

  // Add the new user to the users object
  users[username] = {
    password: password // In a real-world app, you'd hash the password before storing it
  };

  // Return a success response
  return res.status(201).json({
    message: "User registered successfully",
    user: { username } // Only return the username (you can expand this as needed)
  });
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({ books });
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  if (book) {
    return res.status(200).json({ book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase();
  const booksByAuthor = Object.values(books).filter(b => b.author.toLowerCase() === author);
  if (booksByAuthor.length > 0) {
    return res.status(200).json({ books: booksByAuthor });
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title.toLowerCase();
  const booksByTitle = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
  if (booksByTitle.length > 0) {
    return res.status(200).json({ books: booksByTitle });
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  // Find the book with the matching ISBN
  const book = Object.values(books).find(b => b.isbn === isbn);

  // If the book is found, return its reviews
  if (book) {
    return res.status(200).json({ reviews: book.reviews });
  } else {
    // If the book is not found, return a 404 error
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
