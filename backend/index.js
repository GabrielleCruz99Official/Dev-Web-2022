const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://localhost:3001"
}
const app = express();
app.use(cors(corsOptions));

//permet le parsing de data du type json
app.use(express.json());

//permet le parsing d'url de type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
    {name: "Gab", role: "developer"},
    {name: "Matt", role: "developer"},
    {name: "Ryan", role: "client"},
];

const products = [
    {name: "Mini", duration: "3 months"},
    {name: "Regular", duration: "6 months"},
    {name: "Jumbo", duration: "12 months"},
];

/* API */

// CALL API
app.get("/api", (req, res)=>{
    res.json({ message: "Hi! This is the API!" });
});

// GET PRODUCTS
app.get("/api/products", (req, res) => {
    res.json(products);
});

// GET USERS
app.get("/api/users", (req, res) => {
    console.log("api/users called!");
    res.json(users);
});

//à revoir
app.post("/api/register", (req, res) =>{
    res.json({ message: "Register" });
});

app.post("/api/login", (req, res) => {
    res.json({ message: "Login" });
});

app.post("/api/logout", (req, res) => {
    res.json({ message: "Logout" })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});