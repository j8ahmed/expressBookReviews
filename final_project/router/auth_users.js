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
    if (!username || !password) {
        return res.status(404).json({message: "One or more values are Empty"});
    }
    const accessToken = jwt.sign({ data: {username, password} }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = { accessToken }

    res.status(200).send(`User: ${username} has been successfully logged in.`)
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params
    const { review } = req.body
    const { username } = req.user.data

    const key = Object.keys(books).filter((key) => {
        return books[key].isbn === isbn
    })[0]
    if(key){
        books[key].reviews[username] = review
        return res.status(204).send(`Review has been added successfully.`)
    }
    return res.status(404).send(`Book with isbn: ${isbn} cannot be found.`)
});

// delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params
    const { username } = req.user.data

    const key = Object.keys(books).filter((key) => {
        return books[key].isbn === isbn
    })[0]
    if(key){
        delete books[key].reviews[username]
        return res.status(204).send(`Review has been removed successfully.`)
    }
    return res.status(404).send(`Book with isbn: ${isbn} cannot be found.`)
});


/*
//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved")
    },6000)
})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
})

//Console log after calling the promise
console.log("After calling promise");
*/

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
