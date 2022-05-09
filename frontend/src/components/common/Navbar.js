import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';
import './Navbar.css'

function Navbar(){
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
                <Link className="links" to="/demo">Exemples du BOX</Link>
                <Link className="links" to="/login">Connexion</Link>
                <Link className="links" to="/users">Espace Client</Link> 
                <Link className="links" to="/">Deconnexion</Link>
            </div>
        </nav>
    )
}

export default Navbar;