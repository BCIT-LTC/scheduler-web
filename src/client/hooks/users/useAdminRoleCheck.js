import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

/**
 * Custom hook to check if the user has an admin role.
 * @returns {boolean} - Returns true if the user is an admin, false otherwise.
 */
const useAdminRoleCheck = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminRole = () => {
            try {
                let jwtToken = Cookies.get("default_jwt");
                if (!jwtToken) {
                    throw new Error('No JWT token found');
                }

                const decodedToken = jwtDecode(jwtToken);
                const isAdminRole = decodedToken.app_roles && decodedToken.app_roles.includes("admin");
                setIsAdmin(isAdminRole);
            } catch (error) {
                console.error('There has been a problem with decoding the token:', error);
                setIsAdmin(false);
            }
        };

        checkAdminRole();
    }, []);

    return isAdmin;
};

export default useAdminRoleCheck;
