import { useEffect, useState } from 'react';

const useGetAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8000/api/announcement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjaXQuY2EiLCJmaXJzdG5hbWUiOiJmaXJzdGFkbWluIGZpcnN0bmFtZSIsImxhc3RuYW1lIjoiZmlyc3RhZG1pbiBsYXN0bmFtZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDM1NTk4Mn0.EvhHE-YDl3-mxOEnEFfpV_Px7j2-ERNzBHmHP4f17lA`,
            }
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

    return { announcements, isLoading, error };
};

export default useGetAnnouncements;
