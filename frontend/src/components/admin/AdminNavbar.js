import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { AXIOS_CONFIGURATION } from '../utils/Constants';
import AdminUserList from './AdminUserList';

function AdminNavbar() {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-left">
                <div className="container">
                    <Link to="/admin">Home</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="#">Products</Link>
                    <Link to="#">Settings</Link>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar;