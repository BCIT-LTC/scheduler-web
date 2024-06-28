import Cookies from "js-cookie";
import { useState } from 'react';
import commonResponseHandler from "../commonResponseHandler";

const url = `api/events`;

const useDeleteEvent = () => {
    const [deleteEventIsSuccessful, setDeleteEventIsSuccessful] = useState(false);
    const [deleteEventIsLoading, setDeleteEventIsLoading] = useState(false);
    const [deleteEventIsSubmitted, setDeleteEventIsSubmitted] = useState(false);
    const [deleteEventResponseError, setDeleteEventResponseError] = useState(false);

    const deleteEvent = async (event, event_id) => {
        event.preventDefault();
        setDeleteEventIsSubmitted(true);
        setDeleteEventIsLoading(true);

        await fetch(`${url}/${event_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
        })
            .then(commonResponseHandler)
            .then((data) => {
                setDeleteEventIsSuccessful(true);
            })
            .catch((error) => {
                setDeleteEventIsSuccessful(false);
                setDeleteEventResponseError(error.message);
                alert(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setDeleteEventIsLoading(false);
            });
    };

    return { deleteEventIsSuccessful, deleteEventIsLoading, deleteEventIsSubmitted, deleteEventResponseError, deleteEvent };
};

export default useDeleteEvent;