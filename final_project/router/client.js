// Import Axios
const axios = require('axios');

// Function to fetch the list of books
async function getBooks() {
  try {
    const response = await axios.get('path');  // Replace with your actual URL
    console.log('Books:', response.data);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Call the function
getBooks();
// Function to fetch book details by ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`path`);
    console.log('Book details:', response.data);
  } catch (error) {
    console.error('Error fetching book by ISBN:', error);
  }
}

// Call the function with a sample ISBN
getBookByISBN('100');

// Function to fetch books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`path`); 
    console.log('Books by author:', response.data);
  } catch (error) {
    console.error('Error fetching books by author:', error);
  }
}

// Call the function with a sample author
getBooksByAuthor('Jane Austen');

// Function to fetch books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`path`);  
    console.log('Books with title:', response.data);
  } catch (error) {
    console.error('Error fetching books by title:', error);
  }
}

// Call the function with a sample title
getBooksByTitle('Pride and Prejudice');



