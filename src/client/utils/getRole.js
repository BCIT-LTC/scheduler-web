import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

/**
 * Function to get the role of the user from the JWT token.
 * Parses for 'app_roles' and accesses the array to get the role(s).
 * 
 * @param {string} token - The JWT token to parse
 * @returns {string} - The role of the user
 */
const getRoles = (token) => {
    const jwt_token = token ? token : Cookies.get("default_jwt");
    try {
        const decoded = jwtDecode(jwt_token);
        return decoded.app_roles;
    } catch (e) {
        console.error(e);
        return [];
    }
}

/**
 * Function to check if the user has a specific role.
 * Parses for 'app_roles' and accesses the array to check if the role is present.
 * 
 * @param {string} token - The JWT token to parse
 * @param {string} role - The role to check
 * @returns {boolean} - True if the role is present, false otherwise
 */
const hasRole = (role, token) => {
    const jwt_token = token ? token : Cookies.get("default_jwt");
    const fmt_role = role.toLowerCase();
    try {
        const decoded = jwtDecode(jwt_token);
        return decoded.app_roles.includes(fmt_role);
    } catch (e) {
        console.error(e);
        return false;
    }
}

export { getRoles, hasRole };