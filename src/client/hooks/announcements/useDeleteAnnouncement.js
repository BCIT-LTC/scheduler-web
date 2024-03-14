import {useState} from 'react';

/**
 * Custom hook to delete an announcement
 * This hook is used in the Announcements container
 * It makes a DELETE request to the server to delete an announcement
 *
 * @returns {{isDeleted: boolean, error: unknown, deleteAnnouncement: deleteAnnouncement}}
 */
const useDeleteAnnouncements = () => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Function to make a DELETE request to the client side route to delete an announcement
     *
     * @param id
     * @param onSuccess
     * @param onError
     */
    const deleteAnnouncement = (id, onSuccess, onError) => {

        // Getting the jwt token from the cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        const jwtToken = getCookie('jwt');
        fetch(`/api/announcement`, {
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
