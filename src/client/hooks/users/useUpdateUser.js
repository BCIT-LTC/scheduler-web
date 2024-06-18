import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import { CollectionsOutlined } from "@mui/icons-material";

const useUpdateUser = () => {
    const globalcontext = useContext(GlobalContext);
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

        await fetch(`api/user/${event.target.user_id.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                // Checking if the response is successful
                if (!response.ok) {
                    // If response is not ok, throw an error with the response data
                    return response.json().then(errorData => {
                        // console.log(JSON.stringify(errorData.errors))
                        if (errorData.errors) {
                            setUpdateUserResponseError(JSON.stringify(errorData.errors));
                        }
                        throw new Error('Error from backend :' + JSON.stringify(errorData.errors));
                    });
                }
                return response.json();
            })
            .then((data) => {
                setUpdateUserIsSuccessful(true);
            })
            .catch((error) => {
                setUpdateUserIsSuccessful(false);
                // setUpdateUserResponseError(error);
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