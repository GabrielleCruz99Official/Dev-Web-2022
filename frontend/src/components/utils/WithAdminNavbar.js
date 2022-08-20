import React from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import { Outlet } from 'react-router-dom';

const WithAdminNavbar = () => {
    return(
        <>  
            <AdminNavbar />
            <Outlet />
        </>
    );
}

export default WithAdminNavbar;