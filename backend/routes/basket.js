const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
    try{
        const basketQuery = 'SELECT * FROM Basket';
        const rows = await pool.query(basketQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;