const express = require('express');
const router = express.Router()
const config = require('../config/auth.conf')
const pool = require('../helpers/database')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tokenList = {};

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
            const encryptedPass = await bcrypt.hash(password, saltRounds);
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
        const data = req.body;
        const user = {
            email: data.email,
            password: data.password
        }
        
        const loginQuery = 'SELECT UserName, UserEmail, UserPassword FROM user WHERE UserEmail=?';
        const rows = await pool.query(loginQuery, user.email)

        // check si le mail est inscrit
        if(rows.length === 0){
            res.status(400).send(`User with email ${user.email} not found`);
        } else {
            //check si le mot de passe est correcte
        const isValid = await bcrypt.compare(user.password, rows[0].UserPassword)
            if(!isValid){
                res.status(403).json({
                    error: true,
                    message: 'Incorrect password'
                })
            } else {
                //authentification par token
                const token = jwt.sign(
                    user, 
                    config.secret,
                    {
                        algorithm: "HS256",
                        expiresIn: config.tokenLife
                    }
                )
                const refreshToken = jwt.sign(
                    user,
                    config.refreshTokenSecret,
                    {
                        algorithm: "HS256",
                        expiresIn: config.tokenLife
                    }
                );
                
                const response = { 
                    status: "Logged in",
                    user: {
                        name: rows[0].UserName,
                        email: rows[0].UserEmail
                    },
                    token: token, 
                    refreshToken: refreshToken 
                };
                tokenList[refreshToken] = response;
                res.status(200).json(response);
            }
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/token', async (req,res) => {
    try{
        const data = req.body;
        if((!postData.refreshToken) || (!(postData.refreshToken in tokenList))) {
            res.status(404).send(`Invalid request`);
        }
        const user = {
            email: data.email,
            password: data.password
        }
        const token = jwt.sign(
            user, 
            config.secret,
            {
                algorithm: "HS256",
                expiresIn: config.tokenLife
            }
        )        
        const response = {
            token: token
        }
        tokenList[data.refreshToken].token = token;
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/logout', (req, res) => {

})

router.use(require('../helpers/tokenChecker'));

router.get('/secure', (req, res) => {
    res.status(200).send('Route secured');
});

module.exports = router;