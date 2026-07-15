const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Unable to register user." });
  }

  if (isValid(username)) {
    return res.status(404).json({ message: "User already exists!" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const matchingBooks = [];

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      matchingBooks.push({ isbn, ...books[isbn] });
    }
  });

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const matchingBooks = [];

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
      matchingBooks.push({ isbn, ...books[isbn] });
    }
  });

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (Object.keys(book.reviews).length === 0) {
    return res.status(200).json({ message: "No reviews found for this book." });
  }

  return res.status(200).json(book.reviews);
});

/* =========================================================
   TASKS 10–13: Same endpoints re-implemented using Axios
   with Promise callbacks / async-await, as required
   by the assignment (Task 11 on Coursera).
========================================================= */

// Task 10: Get all books – using async/await with Axios
public_users.get('/async/books', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Also expose the same logic as a plain function (used directly by index.js / task script)
function getAllBooks() {
  return axios.get('http://localhost:5000/')
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching books:", error.message);
    });
}

// Task 11: Search by ISBN – using Promise callbacks with Axios
public_users.get('/promise/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching book by ISBN", error: error.message });
    });
});

function getBookByISBN(isbn) {
  return axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching book by ISBN:", error.message);
    });
}

// Task 12: Search by Author – using async/await with Axios
public_users.get('/async/author/:author', async function (req, res) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by author:", error.message);
  }
}

// Task 13: Search by Title – using async/await with Axios
public_users.get('/async/title/:title', async function (req, res) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by title:", error.message);
  }
}

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
