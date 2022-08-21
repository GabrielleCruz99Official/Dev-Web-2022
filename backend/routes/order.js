const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  const orderQuery = 'SELECT Orders.OrderID, Products.ProductName, \
    User.UserName, CONCAT(Street, ", ", Postcode, " ", City) as Address, \
    Orders.OrderDate, Orders.WasPaid, Orders.WasDelivered \
    FROM Orders INNER JOIN User ON Orders.UserID=User.UserID INNER JOIN Products ON Orders.ProductID=Products.ProductID \
    INNER JOIN Address On User.AddressID=Address.AddressID';
  const result = await pool.query(orderQuery);
  res.status(200).json(result);
});

router.get('/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  // const {userId} = req.body;
  const orderQuery = 'SELECT * FROM Orders WHERE OrderID=?';
  const result = await pool.query(orderQuery, orderId);
  res.status(200).json(result);
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  // const {userId} = req.body;
  const orderQuery = 'SELECT * FROM Orders WHERE OrderID=?';
  const result = await pool.query(orderQuery, userId);
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  try {
    const {userId, productId} = req.body;
    const currentDate = new Date();
    const sendToOrderQuery = 'INSERT INTO Orders(UserID, ProductID, OrderDate) \
    VALUES (?,?,?)';
    const result = await pool.query(sendToOrderQuery, [userId, productId, currentDate]);
    res.status(200).json({message: 'Order successfully placed!'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const {wasPaid, wasDelivered} = req.body;
    const patchOrderQuery = 'UPDATE Orders SET WasPaid=?, WasDelivered=? WHERE OrderID=?';
    const query = await pool.query(patchOrderQuery, [wasPaid, wasDelivered, orderId]);
    res.status(200).json({message: 'Order successfully updated!'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deleteOrderQuery = 'DELETE FROM Orders WHERE OrderID=?';
    const result = await pool.query(deleteOrderQuery, orderId);
    res.status(200).json({message: 'Order successfully deleted.'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
