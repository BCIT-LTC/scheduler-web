import { useState } from 'react';

/**
 * Custom hook to create an announcement
 * This hook is used in the Announcements container
 * It makes a POST request to the server to create an announcement
 *
 * @returns {Object} An object containing the createAnnouncement function, error, and isSuccessful state
 */
const useCreateAnnouncement = () => {
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    /**
     * Function to make a POST request to the client side route to create an announcement
     *
     * @param title
     * @param description
     * @param date
     * @param onSuccess
     * @param onError
     * @returns {(function(): void)|*}
     */
    const createAnnouncement = (title, description, date, onSuccess, onError) => {

        // Getting the jwt token from the cookie
        let isMounted = true;
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const jwtToken = getCookie('jwt');

        fetch(`http://localhost:9000/api/announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ title, description, date }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                if (!isMounted) {
                    setIsSuccessful(true);// Set success state to true
                    if (onSuccess) onSuccess();
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError(error.message);
                    setIsSuccessful(false);
                    if (onError) onError();
                }
            });
        return () => {
            isMounted = false;
        };
    };

    return { createAnnouncement, error, isSuccessful }
};

export default useCreateAnnouncement;
