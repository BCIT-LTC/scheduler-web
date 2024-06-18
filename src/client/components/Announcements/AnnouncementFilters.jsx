import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Announcement filters component
 *
 * @param searchText - The text to search for
 * @param setSearchText - Function to update searchText
 * @param sortOption - The option to sort by
 * @param setSortOption - Function to update sortOption
 * 
 */
const AnnouncementFilters = ({ searchText, setSearchText, sortOption, setSortOption }) => {
    const inputRef = useRef();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="search"
                    label="Search Announcements"
                    name="search"
                    autoFocus
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => inputRef.current.focus()}
                                />
                            </InputAdornment>
                        ),
                    }}
                    inputRef={inputRef}
                />
            </Grid>

            <Grid item xs={false} sm={4} />

            <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth style={{ marginTop: '17px' }}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort"
                        value={sortOption}
                        label="Sort By"
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <MenuItem value={'newest'}>Newest</MenuItem>
                        <MenuItem value={'oldest'}>Oldest</MenuItem>
                        <MenuItem value={'alphabetical'}>Alphabetical</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={false} sm={2} />
        </Grid>
    );
};

export default AnnouncementFilters;