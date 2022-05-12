const express = require("express");
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const bodyParser = require("body-parser");
const cors = require("cors");

const users = require('./routes/user');
const products = require('./routes/product');

const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://localhost:3001"
}
const app = express();

/**
 * Middleware
 */
//Cross-Origin Request
app.use(cors(corsOptions));
//permet le parsing de data du type json
app.use(express.json());
//permet le parsing d'url de type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

/* API */

// CALL API INDEX
app.get("/", (req, res)=>{
    res.status(200).json({ message: "Hi! This is the API! Go to /users to load users from database!" });
});

/**
 * Routes
 */
app.use('/users', users);
app.use('/products', products);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});