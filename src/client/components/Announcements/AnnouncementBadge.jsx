import { useState } from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useGetAnnouncements from "../../hooks/announcements/useGetAnnouncements";

const AnnouncementBadge = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { getAnnouncementsData, getAnnouncementsIsSuccessful, getAnnouncementsIsLoading, getAnnouncementsResponseError, getAnnouncements } = useGetAnnouncements();

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await getAnnouncements();
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
          {getAnnouncementsIsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress  />
            </div>
          ) : (
            <List>
              {getAnnouncementsData?.length > 0 ? (
                getAnnouncementsData.map((announcement) => (
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

export default AnnouncementBadge;
