import Cookies from "js-cookie";
import { useState } from 'react';

/*
// How to use:
// For getting an item:
const {
    performAction: getEvent,
    isSuccessful: isGetEventSuccessful,
    isLoading: isGetEventLoading,
    isSubmitted: isGetEventSubmitted,
    responseError: getEventResponseError,
    responseData: eventData
} = useCRUD();

// For creating an item:
const {
    performAction: createEvent,
    isSuccessful: isCreateEventSuccessful,
    isLoading: isCreateEventLoading,
    isSubmitted: isCreateEventSubmitted,
    responseError: createEventResponseError,
    responseData: createdEventData
} = useCRUD();

// For updating an item:
const {
    performAction: updateEvent,
    isSuccessful: isUpdateEventSuccessful,
    isLoading: isUpdateEventLoading,
    isSubmitted: isUpdateEventSubmitted,
    responseError: updateEventResponseError,
    responseData: updatedEventData
} = useCRUD();

// For deleting an item:
const {
    performAction: deleteEvent,
    isSuccessful: isDeleteEventSuccessful,
    isLoading: isDeleteEventLoading,
    isSubmitted: isDeleteEventSubmitted,
    responseError: deleteEventResponseError,
    responseData: deletedEventData
} = useCRUD();
*/

const urlMapping = {
    announcements: 'api/announcements',
    series: 'api/series',
    locations: 'api/locations',
    events: 'api/events',
    roles: 'api/roles',
    users: 'api/users',
};
const actionAllowed = ['get', 'create', 'update', 'delete', 'patch'];

const useCRUD = () => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [responseData, setResponseData] = useState(null);

    function handleError(errorMessage) {
        setIsSuccessful(false);
        setResponseError(errorMessage);
        console.error(errorMessage);
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    const performAction = async (action, itemType, itemData = null, itemId = null) => {
        if (!actionAllowed.includes(action)) {
            handleError(`Invalid action: '${action}' is not supported.`);
        }

        let errorMessage = null;
        if (action === 'create' && (itemData === null || itemData === undefined)) {
            errorMessage = `Invalid itemData: '${itemData}' is not supported.`;
        }
        if ((action === 'update' || action === 'delete' || action === 'patch') && (itemId === null || itemId === undefined)) {
            errorMessage = `Invalid itemId: '${itemId}' is not supported.`;
        }
        if ((action === 'update' || action === 'patch') && (itemData === null || itemData === undefined)) {
            errorMessage = `Invalid request: itemId or itemData is not supported.`;
        }
        if (!urlMapping[itemType]) {
            errorMessage = `Invalid itemType: '${itemType}' is not supported.`;
        }
        if (errorMessage) {
            handleError(errorMessage);
        }

        let url = `${urlMapping[itemType]}`;
        if (itemId) { // If itemId is provided, append it to the URL for "get one"
            url += `/${itemId}`;
        }

        let cookies = Cookies.get("jwt");
        if (action === 'get') {
            if (itemType === 'events' || itemType === 'announcements') {
                cookies = Cookies.get("default_jwt");
            }
        }

        let options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies}`,
            },
        };

        switch (action) {
            case 'get':
                options.method = 'GET';
                break;
            case 'create':
                options.method = 'POST';
                options.body = JSON.stringify(itemData);
                break;
            case 'update':
                options.method = 'PUT';
                options.body = JSON.stringify(itemData);
                break;
            case 'delete':
                options.method = 'DELETE';
                break;
            case 'patch':
                options.method = 'PATCH';
                options.body = JSON.stringify(itemData);
                break;
            default:
                handleError(`Action '${action}' is not supported.`);
                return;
        }

        setIsSubmitted(true);
        setIsLoading(true);

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                const error = errorData.errors ? new Error(errorData.errors) : new Error('An unknown error occurred');
                throw error;
            }
            const data = await response.json();
            setResponseData(data);
            setIsSuccessful(true);
        } catch (error) {
            handleError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { performAction, isSuccessful, isLoading, isSubmitted, responseError, responseData };
};

export default useCRUD;