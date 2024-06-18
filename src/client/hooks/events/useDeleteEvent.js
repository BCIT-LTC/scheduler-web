import Cookies from "js-cookie";
import { useState } from 'react';
const url = `api/events`;


const useDeleteEvent = () => {
    const [isSuccessful, setisSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseError, setResponseError] = useState(false);

    const deleteEvent = async (event, event_id) => {
        event.preventDefault();
        setIsSubmitted(true);
        setIsLoading(true);

        await fetch(`${url}/${event_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
        })
            .then((response) => {
                // Checking if the response is successful
                if (!response.ok) {
                    // If response is not ok, throw an error with the response data
                    return response.json().then(errorData => {
                        setResponseError(errorData);
                        throw new Error(`Error from backend: ${errorData}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setisSuccessful(true);
            })
            .catch((error) => {
                setisSuccessful(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return { isSuccessful, isLoading, isSubmitted, responseError, deleteEvent };
};

export default useDeleteEvent;