import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import '../utils/Constants';
import { BASKET_URL } from '../utils/Constants';

function Basket(){
    const [basketItems, setBasketItems] = useState([]);
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : 0;
    });
    const [passToCheckout, setPassToCheckout] = useState(() => {
        const checkPassToCheckout = localStorage.getItem('passToCheckout');
        return checkPassToCheckout ? true : false;
    });
    const [basketSubtotal, setBasketSubtotal] = useState(0);

    const checkBasketId = () => {
        if (passToCheckout === true){
            passToCheckout.current = false;
            localStorage.setItem('basketId', basketId);
            basketId.current = 0;
        }
        if (basketId.current === 0) basketId.current = IdGenerator();
    }

    const getBasketItems = async () => {
        Axios.get(`${BASKET_URL}/${basketId}`)
        .then((response) => {
            setBasketItems(response.data);
            getBasketSubtotal();
        });
    }

    const getBasketSubtotal = async () => {
        let subtotal = basketItems.map(item => item).reduce((subtotal, basketItem) => {
            return (subtotal += parseInt(basketItem.ProductPrice))
        }, 0);
        setBasketSubtotal(subtotal);
    }

    const removeItemFromBasket = async (productId) => {
        console.log(productId);
        Axios.put(`${BASKET_URL}/${basketId}`,
        {
            productID: productId,
        }).then((response) => {
            console.log(response.data);
            getBasketItems();
        });
    }

    const proceedToCheckout = async () => {
        await Axios.post()
        .then((response) => {

        })
    }

    useEffect(() => {
        checkBasketId();
        getBasketItems();
    }, []);

    useEffect(() => {
        getBasketSubtotal();
    }, [basketItems])

    return(
        <div className="App">
            <h1 className="store-title">Panier</h1>
            <div className="item">
                {basketItems && basketItems.map((item, index) => {
                    return(
                        <div className="card bg-secondary text-center" key={index}>
                            <div className='card-body'>
                                <h5 className="card-title">{item.ProductName}</h5>
                                <p>{item.ProductPrice}€</p>
                                <button onClick={() => {removeItemFromBasket(item.ProductID)}}>Supprimer</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <p>Subtotal: {basketSubtotal}€</p>
                <button onClick={() => {}}>Passer au paiement?</button>
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