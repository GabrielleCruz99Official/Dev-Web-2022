import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar(){
    return(
        <>
            <div>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/store">Home</Link>
                </li>
            </div>
        </>
    )
}