const express = require('express');
const router = express.Router()
const pool = require('../helpers/database')
const bcrypt = require('bcrypt');

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

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        
        //check if username or email is already registered
        // insert code here
        const checkEmailQuery = 'SELECT UserEmail FROM user WHERE UserEmail=?';
        const emailRows = await pool.query(checkEmailQuery, email);
        
        if(emailRows.length > 0){
            res.status(400).json({message: 'Email already registered'});
        } else {
            //password encryption
            const encryptedPass = await bcrypt.hash(password, 10);
            const registerQuery = 'INSERT INTO User(UserName, UserEmail, UserPassword) VALUES (?,?,?)';
            const result = await pool.query(registerQuery, [username, email, encryptedPass]);
            res.status(200).json({message: 'User registered!'});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const loginQuery = 'SELECT UserEmail, UserPassword FROM user WHERE UserEmail=?';
        const rows = await pool.query(loginQuery, email)

        if(rows.length === 0){
            res.status(400).send(`User with email ${email} not found`);
        } else {
            const isValid = await bcrypt.compare(password, rows[0].UserPassword)
            res.status(200).json({validPassword: isValid});
        }   

    } catch(error) {
        res.status(400).send(error.message);
    }
});

/*
router.delete('/delete', async (req, res) => {
    try{
        const {email} = req.body;

        const deleteProfileMutation = 'DELETE from user WHERE UserEmail=?';
        const rows = await pool.query(deleteProfileMutation, email);
        if (rows.length === 0){
            res.status(200).json({message: 'User deleted!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})
*/

module.exports = router;