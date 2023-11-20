import { useContext } from 'react';
import { GlobalContext } from '../context/usercontext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const globalcontext = useContext(GlobalContext);

    if (!globalcontext.isLoggedIn) {
        // If the user is not logged in, redirect to login
        return <Navigate to="/login" replace />
    }

    if (globalcontext.user.role && (globalcontext.user.role !== "admin" && globalcontext.user.role !== "instructor")) {
        // If the user's role is not allowed, redirect to home
        return <Navigate to="/home" replace />
    }

    // User is logged in and has an allowed role, render children
    return <Outlet />
}