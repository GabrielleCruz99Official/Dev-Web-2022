require('dotenv').config({path: '../../.env'});
const nodemailer =require("nodemailer")
const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.post("/:id", async (req, res)=>{

    try{
        const orderid = req.params.id;
        const factureQuery = 'SELECT U.UserName, U.UserEmail, P.ProductName, P.ProductPrice, OrderDate FROM Orders INNER JOIN User as U ON Orders.UserID=U.UserID INNER JOIN Products as P ON Orders.ProductID=P.ProductID WHERE OrderID=?  ';
        const result = await pool.query(factureQuery, orderid);
        console.log(result)
        let HTMLmessage= `  <div>
      <img src="https://cdn.discordapp.com/attachments/953691126559281212/954983262852350023/logosensoria.png" li width="55" height="55" alt="logosensoria">
          
          <p>Bonjour,<br>  L'équipe sensoria vous remercie pour votre commande.<br> Pour confirmer votre commande vous devez la payer par virement bancaire au BE0000000000000
          avec comme communication votre numéro de commande.<br> Votre commande sera envoyer le 15 du mois suivant la reception votre paiement.
          <br>En cas de non paiement dans les 10 jours ouvrables, sensoria annulera votre commande.
          
          </p>
          
          <p>
          
            <h1> facturation: </h1>
          
          </p>
          
          <table style="width:75%; text-align: center">
          
            <tr>
          
                <th> N° de commande</th>
                <th> Produit </th>
                <th> Date </th>
                <th> Prix </th>
            </tr>
            <tr>
                <td> `+ orderid +` </td>
                <td> `+ result[0].ProductName +` </td>
                <td> `+ result[0].OrderDate +` </td>
                <td> `+ result[0].ProductPrice +`€  </td>
            </tr>
           </table>
            <br>
            <br>
            <br>
              <div> En vous vous remerciant, L'équipe Sensoria </div>
            <br>
            <br><br>
                <a href="https://www.sensoria.be">Retrouvez-nous sur Sensoria.be</a>
            <br>
            <br>
                <a href="mailto:info@sensoria.be">Une question ? Contactez-nous</a>
            `


        const transporter = nodemailer.createTransport({
            host: "pro1.mail.ovh.net",
            port: 587,
            secure: false,
            auth: {
                user: "info@sensoria.be",
                pass: process.env.SECRETMAIL
            }
        });
        const mailOptions = {
            from: "info@sensoria.be",
            to: result[0].UserEmail,
            subject: "Facture de la commande" + orderid,
            html: HTMLmessage
        };
        transporter.sendMail(mailOptions);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


    module.exports = router;