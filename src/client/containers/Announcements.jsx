import React, {useState, useMemo, useContext} from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Slide
} from '@mui/material';
import AnnouncementList from "../components/Announcements/AnnouncementList"
import AnnouncementFilter from '../components/Announcements/AnnouncementFilter';
import useGetAnnouncements from "../hooks/announcements/useGetAnnouncement";
import useDeleteAnnouncements from "../hooks/announcements/useDeleteAnnouncement";
import Dialog from '@mui/material/Dialog';
import NewAnnouncement from '../components/Announcements/NewAnnouncement';
import {GlobalContext} from "../context/usercontext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

/**
 * Announcements page aka announcement container
 *
 * @returns {Element}
 * @constructor
 */
const Announcements = () => {
  const [dialog, setDialogue] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('success');
    const { user } = useContext(GlobalContext);
    let role = "student";
    if(user && user.app_role) {
        role = user.app_role;
    }

    // Transition for snackbar
    function TransitionLeft(props) {
        return <Slide {...props} direction="left"/>;
    }
    const handleOpenDialog = () => {
    setDialogue(true);
  }
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }
    }
    const handleAlertClose = () => {
        setOpen(false);
    }
    const handleSnackbarOpen = (message, severity) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
        setSnackbarColor(severity === 'success' ? 'info' : severity);
    }
// used for both edit and create
    const handleCloseDialog = () => {
    setDialogue(false);
  }
  const [filters, setFilters] = useState({
    date: null,
    search: '',
    rooms: [],
    sort: 'latest',
  });
  const { announcements, isLoading, error, refetchAnnouncements } = useGetAnnouncements();
  const { deleteAnnouncement } = useDeleteAnnouncements();

    const onAnnouncementCreated = () => {
      refetchAnnouncements();
  }
  const handleSortChange = (event) => {
    setFilters(prev => ({ ...prev, sort: event.target.value }));
  };

    const sortedAnnouncements = useMemo(() => {
        return [...announcements].sort((a, b) => {
            if (filters.sort === 'latest') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });
    }, [announcements, filters.sort]);



    const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const filteredAnnouncements = sortedAnnouncements.filter(announcement => {
    // Filter by date if a date is set
    if (filters.date && announcement.date !== filters.date) {
      return false;
    }
    // Filter by search text if search text is provided
    if (filters.search && !announcement.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    // Filter by selected rooms if any rooms are selected
    return !(filters.rooms.length > 0 && !filters.rooms.includes(announcement.room));

  });   if (isLoading) {
        return <div>Loading...</div>; // Or some loading spinner
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }
  const TitleBar = () => (
    <Box sx={{ 
      bgcolor: 'white', 
      color: 'black', 
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e0e0e0' 
    }}>
        <Typography variant="h6">Announcements</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" size="small" sx={{ mr: 1 }}>
                <InputLabel id="sort-label" sx={{ color: 'inherit' }}>Sort</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={filters.sort}
                    label="Sort"
                    onChange={handleSortChange}
                    sx={{ color: 'black', background: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                >
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
            </FormControl>
            {role && (role === 'admin' || role === 'instructor') && (
            <Button
                onClick={handleOpenDialog}
                variant="contained"
                sx={{
                    bgcolor: '#1976d2',
                    color: 'white',
                    '&:hover': { bgcolor: '#1565c0' }
                }}
            >
                NEW
            </Button>
            )}
            <Dialog
                open={dialog}
                onClose={handleCloseDialog}
                aria-labelledby="new-announcement-dialog"
            >
                <NewAnnouncement onSnackbarOpen={handleSnackbarOpen} onSnackbarClose={handleSnackbarClose}  handleClose={handleCloseDialog} onAnnouncementCreated={onAnnouncementCreated} />
            </Dialog>
            {/*The Snackbar uses an Alert for better UX*/}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose} TransitionComponent={TransitionLeft}>
                <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }} color={snackbarColor}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    </Box>
);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
            <TitleBar />
            <Grid container spacing={2}> 
                <Grid item xs={12} md={4}>
                    <AnnouncementFilter 
                        onSearchChange={handleSearchChange} 
                        onFilterChange={handleFilterChange} 
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <AnnouncementList
                        onSnackbarOpen={handleSnackbarOpen}
                        onSnackbarClose={handleSnackbarClose}
                        announcements={filteredAnnouncements}
                        onDelete={deleteAnnouncement}
                        refetchAnnouncements={refetchAnnouncements}
                    />
                </Grid>
            </Grid>
        </Paper>
    </Container>
  );    
};

export default Announcements;