const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
    try{
        const productsQuery = 'SELECT * FROM Products';
        const rows = await pool.query(productsQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    try{
        const productQuery = 'SELECT * FROM Products WHERE ProductID=?';
        const rows = await pool.query(productQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;