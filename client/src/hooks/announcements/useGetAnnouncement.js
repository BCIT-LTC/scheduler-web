import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to get announcements
 * This hook is used in the Announcements container
 * It makes a GET request to the server to get announcements
 *
 * @returns {{isLoading: boolean, error: unknown, announcements: *[], refetchAnnouncements: ((function(): void)|*)}}
 */
const useGetAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Function to make a GET request to the client side route to get announcements
     *
     * @type {(function(): void)|*}
     */
    const fetchAnnouncements = useCallback(() => {

        // Getting the jwt token from the cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        const jwtToken = getCookie('jwt');

        setIsLoading(true);
        fetch(`http://localhost:9000/api/announcement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAnnouncements(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    return { announcements, isLoading, error, refetchAnnouncements: fetchAnnouncements };
};

export default useGetAnnouncements;
