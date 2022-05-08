const express = require('express');
const router = express.Router();

let products = [
    {name: "Mini", duration: "3 months"},
    {name: "Regular", duration: "6 months"},
    {name: "Jumbo", duration: "12 months"},
];

router.get('/', (req, res) => {
    res.json(products);
})

module.exports = router;