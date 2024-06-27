import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import commonResponseHandler from "../commonResponseHandler";

const useUpdateUser = () => {
    const [updateUserIsSuccessful, setUpdateUserIsSuccessful] = useState(false);
    const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false);
    const [updateUserIsSubmitted, setUpdateUserIsSubmitted] = useState(false);
    const [updateUserResponseError, setUpdateUserResponseError] = useState(false);

    const updateUser = async (event) => {
        event.preventDefault();
        setUpdateUserIsSubmitted(true);
        setUpdateUserIsLoading(true);

        let app_roles = [];
        for (const value of event.target.app_roles.values()) {
            if (value.checked) {
                app_roles.push(value.value);
            }
        }

        let payload = {
            app_roles: app_roles
        };

        await fetch(`api/users/${event.target.user_id.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(payload),
        })
            .then(commonResponseHandler)
            .then((data) => {
                setUpdateUserIsSuccessful(true);
            })
            .catch((error) => {
                setUpdateUserIsSuccessful(false);
                setUpdateUserResponseError(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setUpdateUserIsLoading(false);
            });
    };
    return {
        updateUserIsSuccessful,
        updateUserIsLoading,
        updateUserIsSubmitted,
        updateUserResponseError,
        updateUser
    };
};

export default useUpdateUser;