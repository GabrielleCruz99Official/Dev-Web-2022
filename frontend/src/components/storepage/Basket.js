import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import '../utils/Constants';
import './Basket.css';
import { ADDRESS_URL, ORDER_URL, FACTURE_URL} from '../utils/Constants';

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
    const userProfile = JSON.parse(localStorage.getItem('user'));
    
    const getAddress = async () => {
        const userEmail = userProfile.email;
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
    const factureCheckout = async (param) =>{
        await Axios.post(`${FACTURE_URL}/${param}`)
            .then((response) => {
                localStorage.removeItem('cart');
                window.location.href="/";
            })
    };

    const proceedToCheckout = async () => {
        let orderId = 0;
        await Axios.post(ORDER_URL, {
            userId: userProfile.id,
            productId: basketItem.ProductID
        })
            .then(async (response) => {
                console.log("Checkout complete!");
                orderId = response.data.data.OrderID;
            })
        factureCheckout(orderId);
        localStorage.removeItem('cart');
        window.location.href="/";
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
                {!address &&
                    <>
                        <p> Vous n'avez pas encore mis votre adresse de livraison! </p>
                        <button>Ajouter une adresse de livraison</button>
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
                <button onClick={proceedToCheckout}>Confirmer mon panier</button>
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