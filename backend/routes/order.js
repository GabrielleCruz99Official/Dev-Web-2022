const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  const orderQuery = 'SELECT Orders.OrderID, Products.ProductName, \
    User.UserName, CONCAT(Street, ", ", Postcode, " ", City) as Address FROM Orders \
    INNER JOIN User ON Orders.UserID=User.UserID INNER JOIN Products ON Orders.ProductID=Products.ProductID \
    INNER JOIN Address On User.AddressID=Address.AddressID';
  const result = await pool.query(orderQuery);
  res.status(200).json(result);
});

router.get('/:orderId', async (req, res) => {
  const orderId = req.params.id;
  // const {userId} = req.body;
  const orderQuery = 'SELECT * FROM Orders WHERE OrderID=?';
  const result = await pool.query(orderQuery, orderId);
  res.status(200).json(result);
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.id;
  // const {userId} = req.body;
  const orderQuery = 'SELECT * FROM Orders WHERE OrderID=?';
  const result = await pool.query(orderQuery, userId);
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  try {
    const {userId, productId} = req.body;
    const sendToOrderQuery = 'INSERT INTO Orders(UserID, ProductID) VALUES (?,?)';
    const result = await pool.query(sendToOrderQuery, [userId, productId]);
    res.status(200).json({message: 'Order successfully placed!'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.patch('/', async (req, res) => {

});

router.delete('/', async (req, res) => {

});

module.exports = router;
