const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// 1. Get all books
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("All Books:");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// 2. Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        console.log("Book by ISBN:");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// 3. Get books by author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        console.log("Books by Author:");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// 4. Get books by title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${title}`);
        console.log("Books by Title:");
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Run all methods
(async () => {
    await getAllBooks();
    await getBookByISBN("1");
    await getBooksByAuthor("Chinua Achebe");
    await getBooksByTitle("Things Fall Apart");
})();
