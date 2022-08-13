import React, {useEffect, useState} from 'react';
import Axios from 'axios';
//import { Link } from 'react-router-dom';
import './Store.css';

function Store(){
    const [products, setProducts] = useState(null);
    //const [hasError, setError] = useState(false);

    const getProducts = async () => {
        Axios.get("http://localhost:3001/products")
            .then((response) => {
                setProducts(response.data);
        });
        /*
        .catch((error) => {
            setError(error);
        });
        */
    };

    useEffect(() => {
        getProducts();
    }, []);

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
                                <button className="btn btn-dark btn-sm">
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