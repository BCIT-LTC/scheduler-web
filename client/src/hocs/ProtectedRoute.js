import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {GlobalContext} from '../context';

/**
 * ProtectedRoute Component
 * This component renders the children components only if the user is an admin.
 * Otherwise, it redirects the user to the home page.
 * It uses the GlobalContext to access the user's isAdmin property.
 */

export default function ProtectedRoute({children}) {
  // Accessing the user's isAdmin property from the GlobalContext
  const {
    state: {
      userData: {isAdmin},
    },
  } = useContext(GlobalContext);

  // Render the children components if the user is an admin
  if (isAdmin) {
    return children;
  }

  // Redirect the user to the home page if not an admin
  return <Navigate to="/" replace />;
}
