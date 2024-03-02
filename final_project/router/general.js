const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body
    if (!username)
        return res.status(400).send("No username provided")
    else if (!password)
        return res.status(400).send("No password provided")

    const usersFiltered = users.filter(user => user.username === username)
    if (usersFiltered.length > 0)
        return res.status(400).send("username already exists")

    users.push({username, password})
    console.log(users)

    res.status(200).send(`User: ${username} has been added successfully.`)
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(books)
        },6000)
    }).then(data => {
        return res.status(200).json(data)
    })
});

/* Code to call enpoint from site and return the readable stream

(function testGetAsync(){
    fetch("http://localhost:5000/")
        .then(async res => {
            const data = await res.json()
            console.log(data)
        })
        .catch(err => {
            console.error(err)
        })
})()

*/


// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const { isbn } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.isbn === isbn
    })
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(books)
        },6000)
    }).then(data => {
        return res.status(200).json(booksFiltered)
    })
});

/* Code to call enpoint from site and return the readable stream

(function testGetAsync(){
    fetch("http://localhost:5000/isbn/9780435272463")
        .then(async res => {
            const data = await res.json()
            console.log(data)
        })
        .catch(err => {
            console.error(err)
        })
})()

*/


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const { author } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.author.includes(author)
    })
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(books)
        },6000)
    }).then(data => {
        return res.status(200).json(booksFiltered)
    })
});

/* Code to call enpoint from site and return the readable stream

(function testGetAsync(){
    fetch("http://localhost:5000/author/Achebe")
        .then(async res => {
            const data = await res.json()
            console.log(data)
        })
        .catch(err => {
            console.error(err)
        })
})()

*/


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const { title } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.title.includes(title)
    })
    res.send(booksFiltered)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const { isbn } = req.params
    const booksFiltered = Object.keys(books).map(key => books[key]).filter((book) => {
        return book.isbn === isbn
    })
    const reviews = booksFiltered.map(book => ({title: book.title, isbn: book.isbn, reviews: book.reviews}))
    res.send(reviews)
});

module.exports.general = public_users;
