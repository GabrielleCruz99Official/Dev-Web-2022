import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import IdGenerator from '../common/IdGenerator';
import './Store.css';

function Store(){
    const [products, setProducts] = useState(null);
    const [basketId, setBasketId] = useState(() => {
        const checkBasketId = localStorage.getItem('basketId');
        return checkBasketId ? parseInt(checkBasketId) : 0;
    });

    const checkBasketId = () => {
        if (basketId === 0) {
            const newBasketId = IdGenerator();
            setBasketId(newBasketId);
            localStorage.setItem('basketId', newBasketId);
        }
    }

    const getProducts = async () => {
        Axios.get("http://localhost:3001/products")
            .then((response) => {
                setProducts(response.data);
        });
    };

    useEffect(() => {
        getProducts();
        checkBasketId();
    }, []);

    const addToBasket = async (productId) => {
        Axios.post('http://localhost:3001/basket/item',
        {
            basketID: basketId,
            productID: productId,
        }).then((response) => {
            console.log(response)
        });
    };

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
                                    onClick={() => {addToBasket(product.ProductID)}}>
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