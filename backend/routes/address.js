const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req, res) => {
    try{
        const addressQuery = 'SELECT * FROM Address';
        const rows = await pool.query(addressQuery);
        res.status(200).json(rows);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.get('/:email', async (req, res) => {
    try{
        const email = req.params.email;
        const addressQuery = 'SELECT U.AddressID, A.Street, A.Postcode, A.City FROM User as U INNER JOIN Address as A ON U.AddressID=A.AddressID WHERE UserEmail=?';
        const rows = await pool.query(addressQuery, email);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try{
        const {email, street, postcode, city} = req.body;
        const getUserIdQuery = 'SELECT UserID FROM User WHERE UserEmail=?';
        const userIdRows = await pool.query(getUserIdQuery, email);
        const userId = userIdRows[0].UserID;

        const newAddressQuery = 'INSERT INTO Address(Street, Postcode, City) VALUES (?,?,?)';
        const newAddressSend = await pool.query(newAddressQuery, [street, postcode, city]);

        const getNewAddressIDQuery = 'SELECT AddressID FROM Address WHERE Street=? AND Postcode=?';
        const getNewAddressIDRows = await pool.query(getNewAddressIDQuery, [street, postcode]);
        const addressId = getNewAddressIDRows[0].AddressID;

        const linkToUserQuery = 'UPDATE User SET AddressID=? WHERE UserID=?';
        const linkToUser = await pool.query(linkToUserQuery, [addressId, userId]);
        res.status(200).json({message: "Address registered!"})
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/');

router.delete('/', async (req, res) => {

})

module.exports = router;