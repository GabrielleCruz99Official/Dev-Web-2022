import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';
import './Navbar.css'

function Navbar(){
    const onClick = () => {
        localStorage.removeItem('user');
        window.location.href="/";
    }
    
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
                {localStorage.user && 
                    <>
                        <Link className="links" to="/users">Espace Client</Link> 
                        <Link className="links" to="/basket">Panier</Link>
                        <Link className="links" to="/" onClick={onClick}>Deconnexion</Link>
                    </>
                }
                {!localStorage.user && 
                    <>
                        <Link className="links" to="/login">Connexion</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;