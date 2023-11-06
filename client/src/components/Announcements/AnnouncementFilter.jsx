import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './AnnouncementFilter.css'; // Make sure to have an AnnouncementFilter.css file

export default function AnnouncementFilter() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [checked, setChecked] = useState({
        room1: false,
        room2: false,
        room3: false,
    });

    const handleCheckboxChange = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
    };
    //
    // Render the filter checkboxes and the calendar widget
    return (
        <div className="announcement-filter">
            <TextField id="search-field" label="Search" variant="outlined" />
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox checked={checked.room1} onChange={handleCheckboxChange} name="room1" />
                    }
                    label="Room 1"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={checked.room2} onChange={handleCheckboxChange} name="room2" />
                    }
                    label="Room 2"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={checked.room3} onChange={handleCheckboxChange} name="room3" />
                    }
                    label="Room 3"
                />
                {/* Add more checkboxes for other rooms as needed */}
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Filter by Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}
