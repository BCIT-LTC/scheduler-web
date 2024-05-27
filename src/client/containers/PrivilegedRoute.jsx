import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCheckIfPermitted from '../hooks/users/useCheckIfPermitted';

export default function PrivilegedRoute() {
    // Check if user is an admin, loading is true while the check is in progress
    const isPermitted = useCheckIfPermitted({roles_to_check: roles});

    // If the user is not an admin, redirect to the unauthorized page
    if (!isPermitted) {
        return <Navigate to="/unauthorized" />;
    }

    // If the user is an admin, display the child components
    return <Outlet />;
}
