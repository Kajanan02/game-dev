import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    const auth = localStorage.getItem('token')
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;