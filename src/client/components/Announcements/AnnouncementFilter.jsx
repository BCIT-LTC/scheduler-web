import React, { useState, useEffect } from "react";
import {
  Box,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
  // Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
// import dayjs from "dayjs";

// Filter styles for mobile view
const filterStyles = {
  searchSection: { mb: 2 },
  roomSection: { mb: 2 },
  dateSection: { mb: 2 },
};

/**
 * Announcement filter component
 *
 * @param onSearchChange
 * @param onFilterChange
 * @returns {Element}
 * @constructor
 */
const AnnouncementFilter = ({ onSearchChange, onFilterChange }) => {
  // const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchText, setSearchText] = useState("");
  const [selectedRooms, setSelectedRooms] = useState({
    SE41025: false,
    SE12339: false,
  });

  // Check if the window is mobile view
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
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Handle room checkbox change
   *
   * @param event
   */
  const handleRoomChange = (event) => {
    const newSelectedRooms = {
      ...selectedRooms,
      [event.target.name]: event.target.checked,
    };
    setSelectedRooms(newSelectedRooms);
    onFilterChange(
      "rooms",
      Object.keys(newSelectedRooms).filter((key) => newSelectedRooms[key])
    );
  };

  /**
   * Handle search text change
   *
   * @param event
   */
  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    onSearchChange(newValue);
  };

  /**
   * Handle date change
   *
   * @param newValue
   */
  // const handleDateChange = (newValue) => {
  //   setSelectedDate(newValue);
  //   onFilterChange("created_at", newValue ? newValue.format("YYYY-MM-DD") : null);
  // };

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
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ced4da",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ced4da",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ced4da",
              },
              borderRadius: 4,
            },
          }}
        />
      </Box>
      {/*Switching to mobile view*/}
      {/* {isMobile() ? (
        <p></p>
      ) : (
        <>
          <Box sx={filterStyles.roomSection}>
            <Typography variant="subtitle1" gutterBottom>
              Room
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRooms.SE41025}
                    onChange={handleRoomChange}
                    name="SE41025"
                  />
                }
                label="SE4-1025"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRooms.SE12339}
                    onChange={handleRoomChange}
                    name="SE12339"
                  />
                }
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
                onChange={handleDateChange}
                textField={(params) => <div />} // This hides the input field
              />
            </LocalizationProvider>
          </Box>
        </>
      )} */}
    </Box>
  );
};

export default AnnouncementFilter;
