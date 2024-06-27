import { useState } from "react";
import Cookies from "js-cookie";
import commonResponseHandler from "../commonResponseHandler";

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
            .then(commonResponseHandler)
            .then((data) => {
                setGetRolesData(data);
                setGetRolesIsSuccesful(true);
            })
            .catch((error) => {
                setGetRolesIsSuccesful(false);
                setGetRolesResponseError(error.message);
                console.error(error.message);
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
