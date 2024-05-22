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

        // Dummy data for testing, remove this when using real data
        let dummyAnnouncements = [
            {
                id: 1,
                title: 'Website Maintenance',
                description: 'OpenLab Scheduler website will be down for maintenance on Sunday, May 5th, 2024 from 00:00 to 06:00 PST.',
                posted_by: 'Jasica Munday',
                posted_date: '2024-04-20T09:32:12',
                last_modified: '2024-04-22T08:12:34'
            },
            {
                id: 2,
                title: 'Statutory Holiday: Victoria Day',
                description: 'BCIT will be closed on May 20th, 2024 for Statutory Holiday: Victoria Day.',
                posted_by: 'Jasica Munday',
                posted_date: '2024-04-24T09:32:12',
                last_modified: '2024-04-24T09:32:12'
            }
        ];
        // setAnnouncements(dummyAnnouncements);

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
