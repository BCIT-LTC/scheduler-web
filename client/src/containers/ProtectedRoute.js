import { useContext } from 'react';
import { GlobalContext } from '../context/usercontext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const globalcontext = useContext(GlobalContext);

    if (!globalcontext.user.is_logged_in) {
        // If the user is not logged in, redirect to login
        return <Navigate to="/login" replace />
    }

    // User is logged in and has an allowed role, render children
    return <Outlet />
}