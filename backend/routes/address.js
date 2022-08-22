const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
  try {
    const addressQuery = 'SELECT * FROM Address';
    const rows = await pool.query(addressQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const addressQuery = 'SELECT U.AddressID, A.Street, A.Postcode, A.City FROM User as U \
    INNER JOIN Address as A ON U.AddressID=A.AddressID WHERE UserID=?';
    const rows = await pool.query(addressQuery, userId);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const {street, postcode, city} = req.body;

    const newAddressQuery = 'INSERT INTO Address(Street, Postcode, City) VALUES (?,?,?)';
    const newAddressSend = await pool.query(newAddressQuery, [street, postcode, city]);

    const getNewAddressIDQuery = 'SELECT AddressID FROM Address WHERE Street=? AND Postcode=?';
    const getNewAddressIDRows = await pool.query(getNewAddressIDQuery, [street, postcode]);
    const addressId = getNewAddressIDRows[0].AddressID;

    const linkToUserQuery = 'UPDATE User SET AddressID=? WHERE UserID=?';
    const linkToUser = await pool.query(linkToUserQuery, [addressId, userId]);
    res.status(200).json({message: 'Address registered!'});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const {street, postcode, city} = req.body;

    const checkAddressQuery = 'SELECT AddressID FROM User WHERE UserID=?';
    const rows = await pool.query(checkAddressQuery, userId);
    if (rows.length === 0) {
      res.status(400).json({message: 'User\'s address not found'});
    } else {
      const addressId = rows[0].AddressID;
      const patchAddressQuery = 'UPDATE Address SET Street=?, Postcode=?, City=? WHERE AddressID=?';
      const result = await pool.query(patchAddressQuery, [street, postcode, city, addressId]);
      res.status(200).json({message: 'User\'s address successfully updated!'});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/', async (req, res) => {

});

module.exports = router;
