import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NewAnnouncementComponent from '../components/Announcements/NewAnnouncementComponent';
const AnnouncementPage = () => {
        const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
        const isUserInstructor = true; // This should be set based on the authentication/authorization logic

        const handleNewAnnouncementClick = () => {
            setShowNewAnnouncement(true);
        };
        return (
            <Box
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <nav aria-label="main">
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Lab open today"/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Lab flooded"/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Lab closed due to zombie infestation"/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </List>
                </nav>
                {isUserInstructor && (
                    <Button variant="contained" color="primary" onClick={handleNewAnnouncementClick}>
                        New Announcement
                    </Button>
                )}

                {showNewAnnouncement && <NewAnnouncementComponent/>}
            </Box>
        );
    };

export default AnnouncementPage;
