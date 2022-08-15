const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
    try {
        const basketQuery = 'SELECT * FROM Basket';
        const rows = await pool.query(basketQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const basketId = req.params.id;
        const basketQuery = "SELECT B.BasketID, B.ProductID, P.ProductName, P.ProductPrice FROM Basket as B INNER JOIN Products as P ON B.ProductID=P.ProductID WHERE BasketID=?";
        const rows = await pool.query(basketQuery, basketId);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/:id', async(req, res) => {
    try{
        const basketID = req.params.id;
        const {productID} = req.body;

        const checkProductQuery = 'SELECT * FROM basket WHERE ProductID=? AND BasketID=?';
        const basketRows = await pool.query(checkProductQuery, [productID, basketID]);

        if(basketRows.length > 0){
            res.status(400).json({message: "Item already in basket"});
        } else {
            const addToBasketQuery = 'INSERT INTO Basket(BasketID, ProductID) VALUES (?,?)';
            const result = await pool.query(addToBasketQuery, [basketID, productID]);
            res.status(200).json({message: 'Item added to basket!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const basketID = req.params.id;
        const {productID} = req.body;
        console.log(productID);

        if (productID){
            const checkProductQuery = 'SELECT * FROM basket WHERE ProductID=? AND BasketID=?';
            const basketRows = await pool.query(checkProductQuery, [productID, basketID]);

            if(basketRows.length == 0){
                res.status(400).json({message: "Item not found in basket!"});
            } else {
                const removeFromBasketQuery = 'DELETE FROM Basket WHERE ProductID=? AND BasketID=?';
                const result = await pool.query(removeFromBasketQuery, [productID, basketID]);
                res.status(200).json({message: 'Item removed from basket!'});
            }
        } else {
            res.status(400).json({message: 'Product doesn\'t exist.'})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const basketID = req.params.id;

        const clearBasketQuery = 'DELETE FROM Basket WHERE BasketID=?';
        const rows =  await pool.query(clearBasketQuery, basketID);
        res.status(200).json({message: "Your basket has been cleared."});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;