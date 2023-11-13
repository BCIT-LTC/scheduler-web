import { useState } from 'react';

const useCreateAnnouncement = () => {
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const createAnnouncement = (title, description, date, onSuccess, onError) => {
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
