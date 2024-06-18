import { useState } from "react";
import Cookies from "js-cookie";

const url = `api/roles`;

const useGetRoles = () => {
    const [getRolesData, setGetRolesData] = useState([]); // This is the data that will be returned from the hook
    const [getRolesIsSuccesful, setGetRolesIsSuccesful] = useState(false);
    const [getRolesIsLoading, setGetRolesIsLoading] = useState(false);
    const [getRolesResponseError, setGetRolesResponseError] = useState(false);

    const getRoles = async () => {
        setGetRolesIsLoading(true);
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
        })
            .then((response) => {
                // Checking if the response is successful  
                if (!response.ok) {
                    // If response is not ok, throw an error with the response data
                    return response.json().then(errorData => {
                        setGetRolesResponseError(errorData);
                        throw new Error('Error from backend');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setGetRolesData(data);
                setGetRolesIsSuccesful(true);
            })
            .catch((error) => {
                setGetRolesIsSuccesful(false);
            })
            .finally(() => {
                setGetRolesIsLoading(false);
            });
    }

    return {
        getRolesData,
        getRolesIsSuccesful,
        getRolesIsLoading,
        getRolesResponseError,
        getRoles
    };
}


export default useGetRoles;
