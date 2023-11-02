import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Create a global context
export const GlobalContext = createContext(undefined);

export default function ContextProvider({ children }) {

    // Create a state to store the user and the isLoggedIn status
    const [Usercontext, setUsercontext] = useState(
        {
            user: null,
            isLoggedIn: false,
            authorizationChecked: false,
        }
    )

    useEffect(() => {
        if (Usercontext.isLoggedIn && Usercontext.authorizationChecked) {
            return;
        }

        // Check if the user is logged in
        let jwt = Cookies.get("jwt");
        if (jwt !== undefined) {
            let user = null;
            user = jwtDecode(jwt);
            setUsercontext({
                user: user,
                isLoggedIn: true,
                authorizationChecked: { ...Usercontext.authorizationChecked },
            });

            // Check if the user is authorized
            if (!Usercontext.authorizationChecked) {
                fetch(
                    "/auth/authorize",
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${Cookies.get('jwt')} `,
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                    }
                )
                    .then(response => {
                        if (!response.ok) {
                            // throw new Error('Authorization failed due to Network error');
                            return response.json().then((data) => {
                                console.log(data);
                            });
                        }
                        return response.json();
                    })
                    .then((data) =>
                        setUsercontext(
                            prevUsercontext => {
                                return {
                                    user: { ...prevUsercontext.user, role: data.role },
                                    isLoggedIn: prevUsercontext.isLoggedIn,
                                    authorizationChecked: true,
                                }
                            }))
                    .catch((error) => {
                        // console.log(error);
                    });
            }
        }
        // If the user is not logged in, set the user to null, and reset to defaults
        else {
            setUsercontext({
                user: null,
                isLoggedIn: false,
                authorizationChecked: false,
            });
        }
    }, [])

    // Return the GlobalContext.Provider component with the value and render the children components
    return (
        <GlobalContext.Provider value={Usercontext}>{children}</GlobalContext.Provider>
    );
}