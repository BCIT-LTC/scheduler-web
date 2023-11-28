import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Create a global context
export const GlobalContext = createContext(undefined);

export default function ContextProvider({ children }) {

    // Check if the user is logged in
    let jwt = Cookies.get("jwt");
    let user = null;
    let isLoggedIn = false;

    if (jwt !== undefined) {
        user = jwtDecode(jwt);
        isLoggedIn = true;
    }
    console.log("user: ", user)
    // Create a state to store the user and the isLoggedIn status
    const [Usercontext, setUsercontext] = useState(
        {
            user: user,
            isLoggedIn: isLoggedIn
        }
    )

    useEffect(() => {

        if (Usercontext.isLoggedIn) {
            // Check if the user is authorized
            if (!Usercontext.user.authorizationChecked) {
                fetch(
                    "/auth/authorize",
                    {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            Authorization: `Bearer ${Cookies.get('jwt')} `,
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                    }
                )
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => { throw err });
                        }
                        return;
                    })
                    .then(() => {
                        if (jwt !== undefined) {
                            // Update the jwt
                            let jwt = Cookies.get("jwt");
                            setUsercontext(
                                {
                                    user: jwtDecode(jwt),
                                    isLoggedIn: true
                                })
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [])

    // Return the GlobalContext.Provider component with the value and render the children components
    return (
        <GlobalContext.Provider value={Usercontext}>{children}</GlobalContext.Provider>
    );
}