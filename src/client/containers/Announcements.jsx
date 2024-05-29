import React, { useState, useMemo } from "react";
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
  Slide,
  Snackbar,
  Alert,
  Dialog,
} from "@mui/material";
import AnnouncementList from "../components/Announcements/AnnouncementList";
import AnnouncementFilter from "../components/Announcements/AnnouncementFilter";
import useGetAnnouncements from "../hooks/announcements/useGetAnnouncement";
import useDeleteAnnouncements from "../hooks/announcements/useDeleteAnnouncement";
import NewAnnouncement from "../components/Announcements/NewAnnouncement";
import dayjs from "dayjs";
import useCheckIfPermitted from "../hooks/users/useCheckIfPermitted";

const Announcements = () => {
  const [dialog, setDialogue] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("success");
  const isAdminOrInstructor = useCheckIfPermitted({
    roles_to_check: ["admin", "instructor"],
  });

  // Transition for snackbar
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleOpenDialog = () => {
    setDialogue(true);
  };

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
    setSnackbarColor(severity === "success" ? "info" : severity);
  };

  // Used for both edit and create
  const handleCloseDialog = () => {
    setDialogue(false);
  };

  const [filters, setFilters] = useState({
    created_at: null,
    search: "",
    rooms: [],
    sort: "latest",
  });

  const { announcements = [], isLoading, error, refetchAnnouncements } = useGetAnnouncements();
  const { deleteAnnouncement } = useDeleteAnnouncements();

  const onAnnouncementCreated = () => {
    refetchAnnouncements();
  };

  const handleSortChange = (event) => {
    setFilters((prev) => ({ ...prev, sort: event.target.value }));
  };

  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => {
      const dateA = dayjs(a.created_at);
      const dateB = dayjs(b.created_at);
      if (filters.sort === "latest") {
        return dateB.diff(dateA);
      } else {
        return dateA.diff(dateB);
      }
    });
  }, [announcements, filters.sort]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const filteredAnnouncements = useMemo(() => {
    return sortedAnnouncements.filter((announcement) => {
      // Filter by date if a date is set
      if (
        filters.created_at &&
        dayjs(announcement.created_at).format("YYYY-MM-DD") !==
          filters.created_at
      ) {
        return false;
      }
      // Filter by search text if search text is provided
      if (
        filters.search &&
        !announcement.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Filter by selected rooms if any rooms are selected
      return !(
        filters.rooms.length > 0 && !filters.rooms.includes(announcement.room)
      );
    });
  }, [sortedAnnouncements, filters]);

  if (isLoading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  const TitleBar = () => (
    <Box
      sx={{
        bgcolor: "white",
        color: "black",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h6">Announcements</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl variant="outlined" size="small" sx={{ mr: 1 }}>
          <InputLabel id="sort-label" sx={{ color: "inherit" }}>
            Sort
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={filters.sort}
            label="Sort"
            onChange={handleSortChange}
            sx={{
              color: "black",
              background: "white",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            }}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
        {isAdminOrInstructor && (
          <Button
            onClick={handleOpenDialog}
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              "&:hover": { bgcolor: "#1565c0" },
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
          <NewAnnouncement
            onSnackbarOpen={handleSnackbarOpen}
            onSnackbarClose={handleSnackbarClose}
            handleClose={[handleCloseDialog, refetchAnnouncements]}
            onAnnouncementCreated={onAnnouncementCreated}
          />
        </Dialog>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          TransitionComponent={TransitionLeft}
        >
          <Alert
            onClose={handleAlertClose}
            severity={severity}
            sx={{ width: "100%" }}
            color={snackbarColor}
          >
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
