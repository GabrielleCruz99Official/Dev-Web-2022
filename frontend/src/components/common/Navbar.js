import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';
import './Navbar.css';
import '../utils/Constants';
import Axios from 'axios';
import { AXIOS_CONFIGURATION, LOGIN_URL } from '../utils/Constants';

function Navbar(){

    const onClick = async () => {
        await Axios.delete(`${LOGIN_URL}`, {}, AXIOS_CONFIGURATION)
        .then((response) => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('cart');
            localStorage.removeItem('user');
            window.location.href="/";
        })
    }

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const check = localStorage.getItem('isLoggedIn');
        return check ? true : false;
    });
    
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Sensoria"
                        title="Sensoria"
                        height="50"
                    />
                </Link>
                <Link className="links" to="/">Notre Concept</Link>
                <Link className="links" to="/store">S'abonner</Link>
                <Link className="links" to="/contact">Contactez-nous</Link>
                {isLoggedIn && 
                    <>
                        <Link className="links" to="/users">Espace Client</Link> 
                        <Link className="links" to="/basket">Panier</Link>
                        <Link className="links" to="/" onClick={onClick}>Deconnexion</Link>
                    </>
                }
                {!isLoggedIn && 
                    <>
                        <Link className="links" to="/login">Connexion</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;