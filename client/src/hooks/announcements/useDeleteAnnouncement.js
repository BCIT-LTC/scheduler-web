import {useState} from 'react';

const useDeleteAnnouncements = () => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const deleteAnnouncement = (id, onSuccess, onError) => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        const jwtToken = getCookie('jwt');
        fetch(`http://localhost:9000/api/announcement`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({id}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setIsDeleted(true);
                if (onSuccess) onSuccess();
            })
            .catch(error => {
                setError(error.message);
                if (onError) onError();
            });
    };
        return {deleteAnnouncement, isDeleted, error};
};

export default useDeleteAnnouncements;
