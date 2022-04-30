import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Sensoria"
                        title="Sensoria"
                        height="50"
                    />
                </Link>
                <Link to="/">Notre Concept</Link>
                <Link to="/store">S'abonner</Link>
                <Link to="/contact">Contactez-nous</Link>
                <Link to="/demo">Exemples du BOX</Link>
                <Link to="/client">Espace Client</Link>
            </div>
        </nav>
    )
}

export default Navbar;