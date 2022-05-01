import React from 'react';
import { Link } from 'react-router-dom';
import './Store.css';

function Store(){
    return(
        <div className="App bg-dark">
            <h1 className="store-title">Achetez un des nos Box Sensoria</h1>
            <div className="item">
                <div className="card bg-secondary text-center">
                    <div className='card-body'>
                        <Link to="#" className="link">
                            <h5 className="card-title">Starter Box</h5>
                            <p>1 film VR nasal</p>
                            <p>Les flacons nécessaires</p>
                            <p>1 casque en prêt</p>
                            <span><strong>Prix 1</strong></span>
                        </Link>
                    </div>
                </div>
                <div className="card bg-secondary text-center">
                    <div className='card-body'>
                        <Link to="#" className="link">
                            <h5 className="card-title">Pro Box</h5>
                            <p>3 films VR nasal</p>
                            <p>Les flacons nécessaires</p>
                            <p>1 casque en prêt</p>
                            <span><strong>Prix 2</strong></span>
                        </Link>
                    </div>           
                </div>
                <div className="card bg-secondary text-center">
                    <div className='card-body'>
                        <Link to="#" className="link">
                            <h5 className="card-title">Ultimate Box</h5>
                            <p>6 films VR nasal</p>
                            <p>Les flacons nécessaires</p>
                            <p>1 casques en prêt</p>
                            <span><strong>Prix 3</strong></span>
                        </Link>
                    </div>            
                </div>
            </div>
            <p className="text-light">Une caution de 120€. Vous sera facturé et restitué.</p>
        </div>
    )
}

export default Store;