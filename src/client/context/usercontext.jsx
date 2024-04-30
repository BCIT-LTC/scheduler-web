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
            console.log("find user detail: ")
            console.log("User: ", user)
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

    // useEffect(() => {
    //     if (Usercontext.user.is_logged_in) {
    //         // Check if the user is authorized
    //         if (!Usercontext.user.authorization_checked) {
    //             fetch(
    //                 "/auth/authorize",
    //                 {
    //                     method: 'POST',
    //                     credentials: 'same-origin',
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get('jwt')} `,
    //                         'Content-Type': 'application/json',
    //                     },
    //                     mode: 'cors',
    //                 }
    //             )
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         return response.json().then(err => { throw err });
    //                     }
    //                     return;
    //                 })
    //                 .then(() => {
    //                     if (jwt !== undefined) {
    //                         // Update the jwt
    //                         let jwt = Cookies.get("jwt");
    //                         setUsercontext(
    //                             {
    //                                 user: jwtDecode(jwt)
    //                             })
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         }
    //     }
    // }, [])

    // Return the GlobalContext.Provider component with the value and render the children components
    return (
        <GlobalContext.Provider value={Usercontext}>{children}</GlobalContext.Provider>
    );
}