const express = require('express');
const router = express.Router();
const config = require('../config/auth.conf');
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tokenList = {};

router.get('/', async (req, res) => {
  try {
    const usersQuery = 'Select User.UserID, User.UserName, User.UserEmail, \
        CONCAT(Street, \", \", Postcode, \" \", City) as Address FROM User \
        INNER JOIN Address ON User.AddressID=Address.AddressID;';
    const rows = await pool.query(usersQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userQuery = 'SELECT * FROM user WHERE UserID=?';
    const rows = await pool.query(userQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const checkEmailQuery = 'SELECT UserEmail FROM user WHERE UserEmail=?';
    const emailRows = await pool.query(checkEmailQuery, email);

    if (emailRows.length > 0) {
      res.status(400).json({message: 'Email already registered'});
    } else {
      const encryptedPass = await bcrypt.hash(password, saltRounds);
      const registerQuery = 'INSERT INTO User(UserName, UserEmail, UserPassword) VALUES (?,?,?)';
      const result = await pool.query(registerQuery, [username, email, encryptedPass]);
      res.status(200).json({message: 'User registered!'});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/secure', (req, res) => {
  res.status(200).send('Route secured');
});

module.exports = router;
