import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button';
import './AnnouncementStyles.css';

const NewAnnouncementComponent = () => {
    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSave = () => {
        // No endpoints configured yet so just log the data to the console for now
        console.log(title, announcement, selectedDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={3} style={{ padding: '20px', width: '500px' }}>
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
                <div >
                    <div className="button-container">
                        <Button variant="outlined" color="primary" onClick={handleSave()}>
                            CANCEL
                        </Button>
                        {/* Uncomment when you want to use the SAVE button and its handler */}
                        <Button className="save-button" variant="contained" color="primary" onClick={handleSave}>
                            SAVE
                        </Button>
                    </div>
                </div>
            </Paper>
        </LocalizationProvider>
    );
};

export default NewAnnouncementComponent;
