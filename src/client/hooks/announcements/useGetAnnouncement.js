import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

/**
 * Custom hook to get announcements
 * This hook is used in the Announcements container
 * It makes a GET request to the server to get announcements
 *
 * @returns {{isLoading: boolean, error: unknown, announcements: Array, refetchAnnouncements: Function}}
 */
const useGetAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAnnouncements = useCallback(() => {
        // Reusing the JWT retrieval from useGetEvents
        let jwtToken = Cookies.get("default_jwt");
        setIsLoading(true);

        fetch(`api/announcement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setAnnouncements(data);
            setIsLoading(false);
        })
        .catch(error => {
            setError(`Failed to fetch announcements: ${error}`);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    return { announcements, isLoading, error, refetchAnnouncements: fetchAnnouncements };
};

export default useGetAnnouncements;
