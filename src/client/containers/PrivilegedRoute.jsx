import { useContext } from 'react';
import { GlobalContext } from '../context/usercontext';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivilegedRoute() {
    const globalcontext = useContext(GlobalContext);

    if (globalcontext.user.app_role && (globalcontext.user.app_role !== "admin")) {
        // If the user's role is not allowed, redirect to home
        console.log("inside")
        return <Navigate to="/" replace />
    }

    // User is logged in and has an allowed role, render children
    return <Outlet />
}