require('dotenv').config({path: './env'})
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const pool = require('../helpers/database');

//stockage des articles pour le paiement

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

router.post('/payment', async (req, res) => {
    try{
        const { amount, source, receipt_email } = req.body;

        const charge = await stripe.charges.create({
            amount, 
            currency: 'eur', 
            source, 
            receipt_email
        });

        if(!change) throw new Error('charge unsuccessful');

        res.status(200).json({
            charge,
            message: 'Charge successful'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;