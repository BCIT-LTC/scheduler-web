import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCheckRoles from '../hooks/useCheckRoles';

export default function PrivilegedRoute(props) {
    // Check if user is an admin, loading is true while the check is in progress
    const isPermitted = useCheckRoles({rolesToCheck: props.roles});

    // If the user is not an admin, redirect to the unauthorized page
    if (!isPermitted) {
        return <Navigate to="/unauthorized" />;
    }

    // If the user is an admin, display the child components
    return <Outlet />;
}
