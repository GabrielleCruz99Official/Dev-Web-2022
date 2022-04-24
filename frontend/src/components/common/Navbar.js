import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';
import './Navbar.css';

function Navbar(){
    return(
        <nav className="link navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <img
                    src={Logo}
                    alt="Sensoria"
                    title="Sensoria"
                    height="50"
                />
            </Link>
            <Link to="/about">Notre Concept</Link>
            <Link to="/store">S'abonner</Link>
            <Link to="/">Contactez-nous</Link>
            <Link to="/">Exemples du BOX</Link>
            <Link to="/login">Espace Client</Link>
        </nav>
    )
}

export default Navbar;