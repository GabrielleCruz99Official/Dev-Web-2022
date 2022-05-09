const express = require('express');
const router = express.Router();

let products = [
    {name: "Starter", films: 1, price: 40, duration: "3 months"},
    {name: "Pro", films: 3, price: 80, duration: "6 months"},
    {name: "Ultimate", films: 6, price: 120, duration: "12 months"},
];

router.get('/', (req, res) => {
    res.json(products);
})

module.exports = router;