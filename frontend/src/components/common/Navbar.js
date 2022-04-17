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
                <Link to="/about">About Us</Link>
                <Link to="/click">Click</Link>
                <Link to="/store">Store</Link>
            </div>
        </nav>
    )
}

export default Navbar;