const express = require('express');
const router = express.Router()
require('dotenv').config;
const pool = require('../helpers/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

/* Liste d'exemple des utilisateurs */
// les mots de passe seront cryptées
let users = [
    {name: "Gab", role: "developer", username: "gab1", password: "gab123"},
    {name: "Matt", role: "developer", username: "matt1", password: "matt123"},
    {name: "Ryan", role: "client", username: "ryan1", password: "ryan123"}
];

router.get('/', async(req, res) => {
    res.json(users);
});

router.post('/register', (req, res) => {
    // hard-coded
    const user = req.body;
    console.log(user);
    users.push(user);

    res.send("User added to database!");

    //db call
    pool.query(
        "INSERT INTO user (UserName, UserEmail, UserPassword, AddressID, SubscriptionID) VALUES (?, ?, ?, ?, ?)",
        [username, email, password, 1, 1],
        (err, result) => {
            console.log(err);
        }
    );

});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
});

module.exports = router;