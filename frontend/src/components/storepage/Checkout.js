import React, {useEffect} from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

require('dotenv').config({path: '.env'});

function Checkout() {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return(
        <>
            <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
                <Elements>

                </Elements>
            </StripeProvider>
        </>
    )
}

export default Checkout;