require('dotenv').config({path: '.env'});
module.exports = {
    key: 'userId',
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}