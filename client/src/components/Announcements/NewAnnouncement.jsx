import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import useCreateAnnouncement from "../../hooks/announcements/useCreateAnnouncement";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
const NewAnnouncementComponent = ( {handleClose, onAnnouncementCreated, onSnackbarOpen} ) => {
    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const {createAnnouncement, error} = useCreateAnnouncement();
    const handleSave = () => {
        console.log('handleSave called with:', title, announcement, selectedDate);
        try {
            createAnnouncement(title, announcement, selectedDate,)
            // TODO: Add mui snackbar instead of alert
            onSnackbarOpen('Announcement created successfully!', "success");
            onAnnouncementCreated();
            handleClose();
        } catch (error) {
            onSnackbarOpen('Announcement not created', "error");
        }
    };
    const isMobile = () => window.innerWidth <= 767;
    // Handle window resize to update mobile view
    useEffect(() => {
        const handleResize = () => {
        if (isMobile()) {
            // Handle mobile view
        } else {
            // Handle desktop view
        }
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
                New Announcements
            </Typography>
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
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, padding: '1.3em 0em' }}>
                    New Announcements
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

export default NewAnnouncementComponent;
