import { createContext, useContext } from 'react';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Create a global context
export const GlobalContext = createContext(undefined);

export default function ContextProvider({ children }) {

    // Create a state to store the user and the isLoggedIn status
    let value = {
        user: null,
        isLoggedIn: false
    }
    
    // Check if the user is logged in
    let jwt = Cookies.get("jwt");
    if (jwt !== undefined) {
        let user = null;
        user = jwtDecode(jwt);
        value.user = user;
        value.isLoggedIn = true;
    }

    // Return the GlobalContext.Provider component with the value and render the children components
    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
}