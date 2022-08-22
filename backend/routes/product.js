const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  try {
    const productsQuery = 'SELECT * FROM Products';
    const rows = await pool.query(productsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productQuery = 'SELECT * FROM Products WHERE ProductID=?';
    const rows = await pool.query(productQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const {name, description, price} = req.body;
    const setPrice = parseFloat(price).toFixed(2);
    const addToProductsQuery = 'INSERT INTO Products(ProductName, ProductDesc, ProductPrice) \
        VALUES (?,?,?)';
    const result = await pool.query(addToProductsQuery, [name, description, setPrice]);
    res.status(200).json({message: 'Product successfully added!'});
  } catch (error) {
    res.status(400).json({message: 'Product not added.'});
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const {name, description, price} = req.body;
    const setPrice = parseFloat(price).toFixed(2);
    const patchProductQuery = 'UPDATE Products SET ProductName=?, ProductDesc=?, \
    ProductPrice=? WHERE ProductID=?';
    const query = await pool.query(patchProductQuery, [name, description, setPrice, productId]);
    res.status(200).json({message: 'Product successfully updated!'});
  } catch (error) {
    res.status(400).json({message: 'Product failed to update.'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProductQuery = 'DELETE FROM Products WHERE ProductID=?';
    const query = await pool.query(deleteProductQuery, productId);
    res.status(200).json({message: 'Product successfully removed!'});
  } catch (error) {
    res.status(400).json({message: 'Product was unsuccessfully removed.'});
  }
});

module.exports = router;
