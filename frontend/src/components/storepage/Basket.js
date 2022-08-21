import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import { Button } from 'react-bootstrap';
import '../utils/Constants';
import './Basket.css';
import { ADDRESS_URL, ORDER_URL } from '../utils/Constants';
import BasketAddressModal from './BasketAddressModal';

function Basket(){
    const [basketItem, setBasketItem] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        return cart ? cart : {}
    });

    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : IdGenerator();
    });
    const [basketSubtotal, setBasketSubtotal] = useState(0);
    const [address, setAddress] = useState({});
    const [hasAddress, setHasAddress] = useState(false);
    const userProfile = JSON.parse(localStorage.getItem('user'));
    
    const getAddress = async () => {
        const userId = userProfile.id;
        await Axios.get(`http://localhost:3001/address/${userId}`)
        .then((response) => {
            setHasAddress(response.data ? true : false);
            setAddress(response.data);
        })
    };

    const getBasketSubtotal = async () => {
        setBasketSubtotal(parseInt(basketItem.ProductPrice));
    }

    const clearBasket = async () => {
        setBasketItem({});
        localStorage.removeItem('cart');
    };    

    const proceedToCheckout = async () => {
        await Axios.post(ORDER_URL, {
            userId: userProfile.id,
            productId: basketItem.ProductID
        })
        .then((response) => {
            console.log("Checkout complete!");
            localStorage.removeItem('cart');
            window.location.href="/";
        })
    }

    useEffect(() => {                                
        getAddress();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }, []);

    useEffect(() => {
        getBasketSubtotal();
    }, [basketItem])

    return(
        <div className="App">
            <h1 className="store-title">Panier</h1>
            <div className="item">
                {Object.keys(basketItem).length < 1 &&
                    <>
                        <p> Votre panier est vide! </p>
                    </>
                }
                {Object.keys(basketItem).length >= 1 && 
                    <>
                        <div className="card bg-secondary text-left">
                            <div className='card-body basket'>
                                <h5 className="card-title">{basketItem.ProductName}</h5>
                                <p>{basketItem.ProductPrice}€</p>
                            </div>
                            <div>
                                <p>Subtotal: {basketSubtotal}€</p>
                            </div>  
                        </div>
                    </>
                }
            </div>
            <h1>Livraison</h1>
            <div className="item">
                {!hasAddress &&
                    <>
                        <p> Vous n'avez pas encore mis votre adresse de livraison! </p>
                        <BasketAddressModal 
                            hasAddress={hasAddress}
                            userId={userProfile.id}
                            getAddress={getAddress}
                        />
                    </>
                }
                {hasAddress && 
                    <>
                        <div className="card bg-secondary text-left">
                            <div className='card-body basket'>
                                <h5 className="card-title">Adresse</h5>
                                <p>{address.Street}</p>
                                <p>{address.Postcode} {address.City}</p>
                            </div>
                            <BasketAddressModal 
                                address={address}
                                hasAddress={hasAddress}
                                userId={userProfile.id}
                                getAddress={getAddress}
                            />
                        </div>
                    </>
                }
            </div>
            <br/>
            <div>
                <Button variant="success" onClick={proceedToCheckout}>Confirmer mon panier</Button>
                <Button onClick={
                    () => {
                        window.location.href="/store"
                    }
                }>Retour au magasin</Button>
            </div>
        </div>
    );
}

export default Basket;