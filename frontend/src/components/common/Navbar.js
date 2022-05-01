import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../visuals/logosensoria.png';
<<<<<<< HEAD
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
=======
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
                <Link className="links" to="/client">Espace Client</Link>
            </div>
>>>>>>> dev
        </nav>
    )
}

export default Navbar;