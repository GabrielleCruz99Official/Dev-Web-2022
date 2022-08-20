import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { AXIOS_CONFIGURATION } from '../utils/Constants';

function AdminNavbar() {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-left">
                <div className="container">
                    <Link>Home</Link>
                    <Link>Users</Link>
                    <Link>Orders</Link>
                    <Link>Settings</Link>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar;