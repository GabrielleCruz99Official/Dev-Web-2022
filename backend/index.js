const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/auth.conf');
const cors = require('cors');

const users = require('./routes/user');
const products = require('./routes/product');
const addresses = require('./routes/address');
const sessions = require('./routes/sessions');
const orders = require('./routes/order');

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
const app = express();

/**
 * Middleware
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(config));
app.use(cookieParser());

/* API */

// CALL API INDEX
app.get('/', (req, res)=>{
  res.status(200).json({message: 'Hi! This is the API!'});
});

/**
 * Routes
 */
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/products', products);
app.use('/address', addresses);
app.use('/orders', orders);
// app.use(require('../helpers/tokenChecker'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
