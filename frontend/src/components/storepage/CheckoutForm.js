import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements';
import axios from 'axios';
import Checkout from './Checkout';

function CheckoutForm({selectedProduct, stripe}){
    if (!selectedProduct) window.location.href('/');

    const [receiptUrl, setReceiptUrl] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        const {token} = await stripe.createToken();

        const order = await axios.post('http://localhost:3001/product/payment', {
            amount: selectedProduct.price.toString().replace('.', ''),
            source: token.id,
            receipt_email: 'test@example.com'
        });

        setReceiptUrl(order.data.charge.receipt_url);
        
        if (receiptUrl){
            return(
                <div>
                    <h2>Payment Successful!</h2>
                    <Link to={receiptUrl}>
                        <button className="btn btn-primary">
                            View Receipt
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn btn-primary">
                            Home
                        </button>
                    </Link>                
                </div>
            )
        }

    } 

    return(
        <div>
            <p>Amount: {selectedProduct.productPrice}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Details
                    <CardNumberElement />
                </label>
                <label>
                    Expiration Date
                    <CardExpiryElement />
                </label>
                <label>
                    CVC
                    <CardCVCElement />
                </label>
                <button type="submit" value="Pay" />
            </form>
        </div>
    )
}

export default injectStripe(CheckoutForm);