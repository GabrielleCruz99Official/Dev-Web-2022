import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import '../utils/Constants';
import './Basket.css';
import { ADDRESS_URL } from '../utils/Constants';

function Basket(){
    const [basketItem, setBasketItem] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        return cart ? cart : null
    });
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : IdGenerator();
    });
    const [basketSubtotal, setBasketSubtotal] = useState(0);
    const [address, setAddress] = useState({});
    
    const getAddress = async () => {
        const userProfile = JSON.parse(localStorage.getItem('user'));
        const userEmail = userProfile.user.email;
        await Axios.get(`http://localhost:3001/address/${userEmail}`)
        .then((response) => {
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
        await Axios.post()
        .then((response) => {

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
                {!basketItem &&
                    <>
                        <p> Votre panier est vide! </p>
                    </>
                }
                {basketItem && 
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
                {!address &&
                    <>
                        <p> Vous n'avez pas encore mis votre adresse de livraison! </p>
                    </>
                }
                {address && 
                    <>
                        <div className="card bg-secondary text-left">
                            <div className='card-body basket'>
                                <h5 className="card-title">Adresse</h5>
                                <p>{address.Street}</p>
                                <p>{address.Postcode} {address.City}</p>
                            </div>
                            <div>
                                <button onClick={() => {}}>Modifier votre adresse</button>
                            </div>  
                        </div>
                    </>
                }
            </div>
            <br/>
            <div>
                <button onClick={() => {}}>Confirmer mon panier</button>
                <button onClick={
                    () => {
                        window.location.href="/store"
                    }
                }>Retour au magasin</button>
            </div>
        </div>
    );
}

export default Basket;