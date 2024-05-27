import {
    useContext
} from 'react';
import {
    GlobalContext
} from '../../context/usercontext';

/**
 * A hook to check if the user has any of the specifed roles.
 * @param {Array} params.roles_to_check - An array of roles to check.
 * @returns {boolean} - Returns true if the user has at least one of the roles.
 */
const useCheckIfPermitted = ({
    roles_to_check
}) => {
    // Get the user from the global context
    const {
        user
    } = useContext(GlobalContext);

    try {
        // Check if user is undefined
        if (!user) {
            console.error("The user is undefined");
            return false;
        }

        //Check if roles_to_check is undefined
        if (!roles_to_check) {
            console.error("The roles_to_check is undefined");
            return false;
        }

        // Function to check if the app_roles includes a specific role
        const checkRole = (role) => {
            // Check if the user.app_roles is undefined
            if (!user.app_roles) {
                console.error("The user.app_roles is undefined");
                return false;
            }
            return user.app_roles.includes(role);
        }

        // Check if the user has any of the roles
        const hasRole = roles_to_check.some(checkRole);

        return hasRole; //return true if the user has at least one of the roles, false otherwise

    } catch (error) {
        console.error("Error in useCheckIfPermitted: ", error);
        return false;
    }
};

export default useCheckIfPermitted;