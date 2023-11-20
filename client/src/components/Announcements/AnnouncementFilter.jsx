import React, { useState, useEffect } from 'react';
import { Box, FormGroup, FormControlLabel, Checkbox, Typography, TextField, InputAdornment } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const filterStyles = {
    searchSection: { mb: 2 },
    roomSection: { mb: 2 },
    dateSection: { mb: 2 },
  };
const AnnouncementFilter = ({ onSearchChange, onFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchText, setSearchText] = useState('');
  const [selectedRooms, setSelectedRooms] = useState({
    SE41025: false,
    SE12339: false,
  });

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

  const handleRoomChange = (event) => {
    const newSelectedRooms = {
      ...selectedRooms,
      [event.target.name]: event.target.checked,
    };
    setSelectedRooms(newSelectedRooms);
    onFilterChange('rooms', Object.keys(newSelectedRooms).filter(key => newSelectedRooms[key]));
  };

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    onSearchChange(newValue);
  };


  return (
    <Box>
        <Box sx={filterStyles.searchSection}>
            <TextField
            fullWidth
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search announcements"
            size="small"
            margin="dense"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
                sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ced4da',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ced4da',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ced4da',
                },
                borderRadius: 4,
                },
            }}
            />
        </Box>
        {isMobile() ? (
          <p></p>
        ): (
        <>
          <Box sx={filterStyles.roomSection}>
            <Typography variant="subtitle1" gutterBottom>
              Room
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={selectedRooms.SE41025} onChange={handleRoomChange} name="SE41025" />}
                label="SE4-1025"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedRooms.SE12339} onChange={handleRoomChange} name="SE12339" />}
                label="SE12-339"
              />
            </FormGroup>
          </Box>
          <Box sx={filterStyles.dateSection}>
            <Typography variant="subtitle1" gutterBottom>
              Filter by date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  onFilterChange('date', newValue ? newValue.format('YYYY-MM-DD') : null);
                }}
                renderInput={(params) => <div />} // This hides the input field
              />
            </LocalizationProvider>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AnnouncementFilter;
