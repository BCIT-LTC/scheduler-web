import React from 'react';
import PropTypes from 'prop-types';
import { Alert, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';

// Set up cache for the alert
const Cache = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
};

/**
 * Announcements alert component.
 * 
 * @param {string} title - Announcement title 
 * @param {string} message - Announcement message
 * @param {string} cacheKey - Cache key for the alert
 * @param {function} onDismiss - Function to dismiss the alert
 * @returns {React.Element}
 */
const AnnouncementAlert = ({ title, message, cacheKey, onDismiss }) => {

    const handleDismiss = () => {
        Cache.setItem(cacheKey, true); // Cache the dismissal state
        onDismiss(); // Call the provided dismiss handler
    };

    return (
        <Alert
            severity="error"
            variant="filled"
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="medium"
                    onClick={handleDismiss}
                >
                    <CancelIcon fontSize="inherit" />
                </IconButton>
            }
        >
            <Box sx={{ display: "flex", flexDirection: "column", color: "white" }}>
                <Box sx={{ fontSize: "1.2em", padding: "0" }}>{title.toUpperCase()}</Box>
                <Box sx={{ fontWeight: "400", paddingTop: "0.4em" }}>{message}</Box>
            </Box>
        </Alert>
    );
};

AnnouncementAlert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    cacheKey: PropTypes.string.isRequired,
    onDismiss: PropTypes.func,
};

AnnouncementAlert.defaultProps = {
    onDismiss: () => {},
};

export default AnnouncementAlert;
