const express = require("express");
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/auth.conf')
const cors = require("cors");

const users = require('./routes/user');
const products = require('./routes/product');
const addresses = require('./routes/address');
const sessions = require('./routes/sessions'); 

const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
const app = express();

/**
 * Middleware
 */
//permet l'usage des cookies
app.use(cookieParser());
//Cross-Origin Request
app.use(cors(corsOptions));
//permet le parsing de data du type json
app.use(express.json());
//permet le parsing d'url de type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//permet l'utilisation des sessions
app.use(session(config));

/* API */

// CALL API INDEX
app.get("/", (req, res)=>{
    res.status(200).json({ message: "Hi! This is the API! Go to /users to load users from database!" });
});

/**
 * Routes
 */
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/products', products);
app.use('/address', addresses);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});