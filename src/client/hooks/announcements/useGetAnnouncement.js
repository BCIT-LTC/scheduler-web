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

        // Dummy data for testing, remove this when using real data
        let dummyAnnouncements = [
            {
                id: 1,
                title: 'Website Maintenance',
                description: 'OpenLab Scheduler website will be down for maintenance on Sunday, March 3rd, 2024 from 00:00 to 06:00 PST.',
                posted_by: 'Jasica Munday',
                posted_date: '2024-01-07T09:32:12',
                last_modified: '2024-01-08T08:12:34'
            },
            {
                id: 2,
                title: 'Statutory Holiday: Good Friday',
                description: 'BCIT will be closed on March 29th, 2024 for Statutory Holiday: Good Friday.',
                posted_by: 'Jasica Munday',
                posted_date: '2024-03-01T09:32:12',
                last_modified: '2024-03-02T08:12:34'
            }
        ];
        setAnnouncements(dummyAnnouncements);
        // remove above when using real data

        fetch(`/api/announcement`, {
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
                //uncomment below to use real data
                // setAnnouncements(data);
                setAnnouncements(dummyAnnouncements);
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
