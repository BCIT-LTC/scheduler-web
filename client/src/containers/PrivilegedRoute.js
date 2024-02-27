import { useContext } from 'react';
import { GlobalContext } from '../context/usercontext';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivilegedRoute() {
    const globalcontext = useContext(GlobalContext);

    if (globalcontext.user.role && (globalcontext.user.role !== "admin" && globalcontext.user.role !== "instructor")) {
        // If the user's role is not allowed, redirect to home
        return <Navigate to="/" replace />
    }

    // User is logged in and has an allowed role, render children
    return <Outlet />
}