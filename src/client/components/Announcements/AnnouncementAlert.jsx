import React from 'react';
import { Alert, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';


//set up cache for the alert
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
 * @param {*} title announcment title 
 * @param {*} message announcement message
 * @param {*} cacheKey cache key for the alert
 * @param {*} onDismiss function to dismiss the alert
 * @returns {Element}
 */
const AnnouncementAlert = ({ title, message, cacheKey, onDismiss = () => { } }) => {

    const handleDismiss = () => {
        Cache.setItem(cacheKey, true);
        onDismiss();
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
            <Box sx={{display: "flex", flexDirection:"column", color:"white"}}>
                <Box sx={{fontSize: "1.2em", padding: "0"}}>{title.toUpperCase()}</Box>
                <Box sx={{fontWeight: "400", paddingTop: "0.4em"}}>{message}</Box>
            </Box>
        </Alert>
    );
};

export default AnnouncementAlert;