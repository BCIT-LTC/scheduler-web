import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import useEditAnnouncement from "../../hooks/announcements/useEditAnnouncement";
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system';

/**
 * Edit announcement component
 *
 * @param id
 * @param existingTitle
 * @param existingDescription
 * @param existingDate
 * @param handleClose
 * @param onAnnouncementEdited
 * @param onSnackbarOpen
 * @returns {Element}
 * @constructor
 */
const EditAnnouncementComponent = ({ id, existingTitle, existingDescription, existingDate, handleClose, onAnnouncementEdited, onSnackbarOpen }) => {
    const [title, setTitle] = useState(existingTitle || '');
    const [announcement, setAnnouncement] = useState(existingDescription || '');
    const [selectedDate, setSelectedDate] = useState(existingDate ? dayjs(existingDate) : null);
    const { editAnnouncement } = useEditAnnouncement();

    // Calling the useEditAnnouncement hook to make the API call
    const handleSave = () => {
        const formattedDateForSave = selectedDate ? dayjs(selectedDate).toISOString() : null;
        const action = editAnnouncement
        const successCallback = onAnnouncementEdited

        // This could benefit from better error handling
        action(id, title, announcement, formattedDateForSave, () => {
            onSnackbarOpen('Announcement edited successfully!', "success");
            successCallback();
            handleClose();
        }, (error) => {
            console.log("Announcement not edited" + error)
            onSnackbarOpen('Announcement not edited', "error");
        });
    };
    // Check if the window is mobile view
    const isMobile = () => window.innerWidth <= 767;
            useEffect(() => {
        const handleResize = () => {
        if (isMobile()) {} else {}
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {isMobile() ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-start', alignItems: 'center', padding:"5px"}}>
            <Typography variant="h5" component="div" marginBottom={'20px'} marginTop={'20px'}>
                Edit Announcements
            </Typography>
            {/*Could refactor this box and make it into a separate component*/}
            <Box>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ marginBottom: '15px'}}
                />
                <TextField
                    fullWidth
                    label="Announcement"
                    variant="outlined"
                    multiline
                    rows={10}
                    value={announcement}
                    onChange={e => setAnnouncement(e.target.value)}
                    style={{ marginBottom: '15px' }}
                />
                <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                    style={{ marginBottom: '15px' }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '30%',
                    paddingTop: '10px', // Add space between the content and buttons
                }}>
                    <Button variant="outlined" color="primary" onClick={handleClose} style={{ marginRight: '5px' }}>
                        CANCEL
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        SAVE
                    </Button>
                </div>
            </Box>
        </div>
        ) : (
        <Paper elevation={3} style={{ padding: '20px', width: '500px' }}>
        <Typography variant="h5" component="div" marginBottom={'20px'} marginTop={'20px'}>
            Edit Announcements
        </Typography>
            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ marginBottom: '15px' }}
            />
            <TextField
                fullWidth
                label="Announcement"
                variant="outlined"
                multiline
                rows={4}
                value={announcement}
                onChange={e => setAnnouncement(e.target.value)}
                style={{ marginBottom: '15px' }}
            />
            <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                style={{ marginBottom: '15px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #0e0007', width: '30%', marginTop: '2%', paddingTop: '2%'}}>
                <Button variant="outlined" color="primary" onClick={handleClose} style={{marginRight: '5px'}}>
                    CANCEL
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    SAVE
                </Button>
            </div>
        </Paper>
        )}
    </LocalizationProvider>
    );
};

export default EditAnnouncementComponent;
