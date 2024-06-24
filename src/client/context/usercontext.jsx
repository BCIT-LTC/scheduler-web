import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Create a global context
export const GlobalContext = createContext(undefined);

export default function ContextProvider({ children }) {

    // Check if the user is logged in
    let jwt = Cookies.get("jwt");
    let default_jwt = Cookies.get("default_jwt");
    let user = null;

    try {
        if (jwt === undefined) {
            user = jwtDecode(default_jwt);
        } else {
            user = jwtDecode(jwt);
            // console.log("find user detail: ")
            // console.log("User: ", user)
            // console.log("Roles", user.app_roles);
        }
    }
    catch (error) {
        console.log(error);
        window.location.href = "/auth/authorize/default_jwt";
    }
    
    // Create a state to store the user context
    const [Usercontext, setUsercontext] = useState(
        {
            user: user
        }
    )

    if (Usercontext.user === null) {
        window.location.href = "/auth/authorize/default_jwt";
    }
    else {
        // Return the GlobalContext.Provider component with the value and render the children components
        return (
            <GlobalContext.Provider value={Usercontext}>{children}</GlobalContext.Provider>
        );
    }
}