import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

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
const AnnouncementAlert = ({
    title = '',
    message = '',
    cacheKey = '',
    onDismiss = () => { }
} = {}) => {

    if (!title || !message || !cacheKey) {
        throw new Error('title, message and cacheKey are required parameters');
    }

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
            <Box sx={{ display: "flex", flexDirection: "column", color: "white" }}>
                <Box sx={{ fontSize: "1.2em", padding: "0" }}>{title.toUpperCase()}</Box>
                <Box sx={{ fontWeight: "400", paddingTop: "0.4em" }}>{message}</Box>
            </Box>
        </Alert>
    );
};

export default AnnouncementAlert;