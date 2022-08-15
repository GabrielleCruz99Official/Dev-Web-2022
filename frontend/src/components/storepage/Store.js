import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import '../utils/Constants';
import './Store.css';
import { BASKET_URL, PRODUCT_URL } from '../utils/Constants';

function Store(){
    const [products, setProducts] = useState(null);
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : 0;
    });
    const [cart, setCart] = useState({});

    const checkBasketId = () => {
        if (basketId === 0) {
            const newBasketId = IdGenerator();
            setBasketId(newBasketId);
            localStorage.setItem('basketId', newBasketId);
        }
    }

    const getProducts = async () => {
        Axios.get(PRODUCT_URL)
            .then((response) => {
                setProducts(response.data);
        });
    };

    useEffect(() => {
        getProducts();
        checkBasketId();
    }, []);

    const addToCart = (storeItem) => {
        if(window.confirm("Confirmez-vous de prendre ce produit?")){
            setCart(storeItem);
            localStorage.setItem('cart', cart);
            console.log("Added to cart!");
            //redirect to order page
        }
    }

    return(
        <div className="App bg-dark">
            <h1 className="store-title">Achetez un des nos Box Sensoria</h1>
            <div className="item">
                {products && products.map((product, index) => {
                    return(
                        <div className="card bg-secondary text-center" key={index}>
                            <div className='card-body'>
                                <h5 className="card-title">{product.ProductName}</h5>
                                <p>{product.ProductDesc}</p>
                                <button className="btn btn-dark btn-sm"
                                    onClick={() => {addToCart(product)}}>
                                    <strong>{product.ProductPrice} €</strong>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div>
                <p className="text-light">Une caution de 120€. Vous sera facturé et restitué.</p>
            </div>
        </div>
    )
}

export default Store;