const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const { isbn } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.isbn === isbn
    })
    res.send(booksFiltered)
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const { author } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.author.includes(author)
    })
    res.send(booksFiltered)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
