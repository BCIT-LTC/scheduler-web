import React from "react";
import {
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useGetAnnouncements from "../../hooks/announcements/useGetAnnouncement";

const AnnouncementButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { announcements, isLoading, refetchAnnouncements } =
    useGetAnnouncements();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    refetchAnnouncements();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton
        color="primary"
        onClick={handleClick}
        sx={{ mr: 1 }}
        style={{
          color: "white",
          fontSize: "20px",
        }}
        size="large"
        edge="start"
        aria-label="menu"
      >
        <NotificationsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, width: 300, maxHeight: 400, overflow: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Announcements
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <List>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <ListItem key={announcement.announcement_id}>
                    <ListItemText
                      primary={announcement.title}
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            component="span"
                            color="textSecondary"
                          >
                            {announcement.description}
                          </Typography>
                          <br />
                          <Typography
                            variant="caption"
                            component="span"
                            color="textSecondary"
                          >
                            <span style={{ fontWeight: "bold" }}>
                              Last updated:
                            </span>{" "}
                            {new Date(
                              announcement.last_modified
                            ).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>No announcements available</Typography>
              )}
            </List>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AnnouncementButton;
