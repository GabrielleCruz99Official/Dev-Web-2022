import React from 'react';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';

const WithoutNavbar = () => {
    return(
        <>
            <Outlet />
        </>
    );
}

export default WithoutNavbar;