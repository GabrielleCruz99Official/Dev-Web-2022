import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';

function Basket(){
    const [basketItems, setBasketItems] = useState(null);
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : 0;
    });
    const [passToCheckout, setPassToCheckout] = useState(() => {
        const checkPassToCheckout = localStorage.getItem('passToCheckout');
        return checkPassToCheckout ? true : false;
    });

    const checkBasketId = () => {
        if (passToCheckout === true){
            passToCheckout.current = false;
            localStorage.setItem('basketId', basketId);
            basketId.current = 0;
        }
        if (basketId.current === 0) basketId.current = IdGenerator();
    }

    const getBasketItems = async () => {
        Axios.get(`http://localhost:3001/basket/${basketId}`)
        .then((response) => {
            setBasketItems(response.data);
        });
    }

    useEffect(() => {
        checkBasketId();
        getBasketItems();
    }, []);

    return(
        <div className="App">
            <h1 className="store-title">Panier</h1>
            <div className="item">
                {basketItems && basketItems.map((basket, index) => {
                    return(
                        <div className="card bg-secondary text-center" key={index}>
                            <div className='card-body'>
                                <h5 className="card-title">{basket.ProductName}</h5>
                                <p>{basket.ProductPrice}€</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Basket;