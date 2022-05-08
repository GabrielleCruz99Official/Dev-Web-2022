import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Store.css';

function Store(){
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return(
        <div className="App bg-dark">
            <h1 className="store-title">Achetez un des nos Box Sensoria</h1>
            <div className="item">
                {products && products.map((product, index) => {
                    return(
                        <div className="card bg-secondary text-center" key={index}>
                            <div className='card-body'>
                                <Link to="#" className="link">
                                    <h5 className="card-title">{product.name} Box</h5>
                                    <p>{product.films} film VR nasal</p>
                                    <p>Les flacons nécessaires</p>
                                    <p>1 casque en prêt</p>
                                    <p>Durée: {product.duration}</p>
                                    <span><strong>{product.price} €</strong></span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-light">Une caution de 120€. Vous sera facturé et restitué.</p>
        </div>
    )
}

export default Store;