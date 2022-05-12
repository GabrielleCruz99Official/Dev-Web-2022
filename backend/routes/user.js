const express = require('express');
const router = express.Router()
const pool = require('../helpers/database')

router.get('/', async (req, res) => {
    try{
        const usersQuery = 'SELECT * FROM user;';
        const rows = await pool.query(usersQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const userQuery = 'SELECT * FROM user WHERE UserID=?';
        const rows = await pool.query(userQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/register', (req, res) => {
    const user = req.body;

    console.log(user);
    users.push(user);

    res.send("User added to database!");
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
});

module.exports = router;