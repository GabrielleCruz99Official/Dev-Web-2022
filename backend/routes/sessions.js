const express = require('express');
const router = express.Router();
const config = require('../config/auth.conf');
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const tokenList = {};

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const user = {
      email: data.email,
      password: data.password,
    };

    const loginQuery = 'SELECT UserID, UserName, UserEmail, UserPassword FROM user WHERE UserEmail=?';
    const rows = await pool.query(loginQuery, user.email);
    if (rows.length === 0) {
      res.status(400).send(`User with email ${user.email} not found`);
    } else {
      const isValid = await bcrypt.compare(user.password, rows[0].UserPassword);
      if (!isValid) {
        res.status(403).json({
          error: true,
          message: 'Incorrect password',
        });
      } else {
        const token = jwt.sign(
            user,
            config.secret,
            {
              algorithm: 'HS256',
              expiresIn: config.tokenLife,
            },
        );
        const refreshToken = jwt.sign(
            user,
            config.refreshTokenSecret,
            {
              algorithm: 'HS256',
              expiresIn: config.tokenLife,
            },
        );
        return res
            .cookie('access_token', token, {
              httpOnly: true,
              secure: true,
              expires: config.cookieLife,
              sameSite: 'strict',
            })
            .status(200)
            .json({
              message: 'Logged in successfully 😊 👌',
              user: {
                id: rows[0].UserID,
                name: rows[0].UserName,
                email: rows[0].UserEmail,
              },
            });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/', (req, res) => {
  try {
    console.log('Is this working?');
    res.clearCookie('access_token', {path: '/'});
    return res.end();
  } catch (error) {
    res.status(400).json({message: 'Cookie isn\'t cleared'});
  }
});

router.get('/protected', (req, res) => {
  return res.json({user: {id: req.id}});
});

router.use(require('../helpers/tokenChecker'));

module.exports = router;
