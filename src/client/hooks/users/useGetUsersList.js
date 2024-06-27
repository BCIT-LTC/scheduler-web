import { useState } from "react";
import Cookies from "js-cookie";
import commonResponseHandler from "../commonResponseHandler";

const url = `api/users`;

const useGetUsersList = () => {
    const [getUsersListData, setGetUsersListData] = useState([]); // This is the data that will be returned from the hook
    const [getUsersListIsSuccessful, setGetUsersListIsSuccessful] = useState(false);
    const [getUsersListIsLoading, setGetUsersListIsLoading] = useState(false);
    const [getUsersListResponseError, setGetUsersListResponseError] = useState(false);

    const getUsersList = async () => {
        setGetUsersListIsLoading(true);
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
        })
            .then(commonResponseHandler)
            .then((data) => {
                setGetUsersListData(data);
                setGetUsersListIsSuccessful(true);
            })
            .catch((error) => {
                setGetUsersListIsSuccessful(false);
                setGetUsersListResponseError(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setGetUsersListIsLoading(false);
            });
    }

    return {
        getUsersListData,
        getUsersListIsSuccessful,
        getUsersListIsLoading,
        getUsersListResponseError,
        getUsersList
    };
}


export default useGetUsersList;
