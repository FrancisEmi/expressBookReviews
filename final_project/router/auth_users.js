const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;

    // Validate user credentials
    if (!username || !password) {
      return res.status(400).json({"username":"user2", "password":"password2"});
    }
  
    if (!authenticatedUser(username, password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  
    // Generate JWT token
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' }); // Secret and expiration time
  
    return res.status(200).json({
      message: "Logged in successfully",
      token: token // Send the token to the client
    });
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query;
    const username = req.user.username;
  
    if (!review) {
      return res.status(400).json({ message: "Review is required" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    // Add or modify the review based on the username
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({ message: "Review added/modified successfully" });
  });
  

regd_users.delete("/auth/review/:isbn", authenticateJWT, (req, res) => {
    const { isbn } = req.params;
    const username = req.user.username;
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    if (!books[isbn].reviews[username]) {
      return res.status(403).json({ message: "You cannot delete a review you did not post" });
    }
  
    // Delete the review
    delete books[isbn].reviews[username];
  
    return res.status(200).json({ message: "Review deleted successfully" });
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
