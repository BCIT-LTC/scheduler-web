import {useState} from 'react';

/**
 * Custom hook to edit an announcement
 * This hook is used in the Announcements container
 * It makes a PUT request to the server to edit an announcement
 *
 * @returns {{isSuccessful: boolean, error: unknown, editAnnouncement: editAnnouncement}}
 */
const useEditAnnouncement = () => {
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

    /**
     * Function to make a PUT request to the client side route to edit an announcement
     *
     * @param id
     * @param title
     * @param description
     * @param date
     * @param onSuccess
     * @param onError
     */
    const editAnnouncement = (id, title, description, date, onSuccess, onError) => {

        // Getting the jwt token from the cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        const jwtToken = getCookie('jwt');

        fetch(`http://localhost:9000/api/announcement`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({id, title, description, date}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setIsSuccessful(true);
                if (onSuccess) onSuccess();
            })
            .catch(() => {
                setIsSuccessful(false);
                if (onError) onError();
                setError('Network response was not ok')
            });
    };
    return {editAnnouncement, error, isSuccessful}
}

export default useEditAnnouncement;