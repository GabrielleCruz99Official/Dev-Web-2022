import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import '../utils/Constants';
import { BASKET_URL } from '../utils/Constants';

function Basket(){
    const [basketItem, setBasketItem] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        return cart ? cart : null
    });
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : IdGenerator();
    });
    const [basketSubtotal, setBasketSubtotal] = useState(0);

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

    const reload = async () => {
    
    }

    useEffect(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }, []);

    useEffect(() => {
        reload();
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
                            <div className='card-body'>
                                <h5 className="card-title">{basketItem.ProductName}</h5>
                                <p>{basketItem.ProductPrice}€</p>
                                <button onClick={clearBasket}>Supprimer</button>
                            </div>
                            <hr/>
                            <div>
                                <p>Subtotal: {basketSubtotal}€</p>
                                <button onClick={() => {}}>Confirmer mon panier</button>
                            </div>  
                        </div>
                    </>
                }
            </div>
            <hr/>
            <div>
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