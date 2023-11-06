import React, {useState} from "react";
import AnnouncementList from "../components/Announcements/AnnouncementList"
import Button from '@mui/material/Button';
import NewAnnouncementComponent from "../components/Announcements/NewAnnouncementComponent";
import MenuItem from "@mui/material/MenuItem";
import {Select} from "@mui/material";
import AnnouncementFilter from "../components/Announcements/AnnouncementFilter";
import "./Announcement.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
const announcementsData = [
    {
        id: 1,
        title: 'Blood pressure station offline for maintenance',
        date: 'February 4, 2023',
        description: 'Lorem Ipsum is simply dummy text...'
    },
    {
        id: 2,
        title: 'Blood pressure station offline for maintenance',
        date: 'February 4, 2023',
        description: 'Lorem Ipsum is simply dummy text...'
    },
    {
        id: 3,
        title: 'Blood pressure station offline for maintenance',
        date: 'February 4, 2023',
        description: 'Lorem Ipsum is simply dummy text...'
    },
    {
        id: 4,
        title: 'Blood pressure station offline for maintenance',
        date: 'February 4, 2023',
        description: 'Lorem Ipsum is simply dummy text...'
    },
    // ...other announcements
];
const Announcements = () => {
    const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);

    const handleNewClick = () => {
        setShowNewAnnouncement(true); // This will show the NewAnnouncementComponent
    };

    return (
        <>
            {/* TODO: announcements containers */}
            <div className="announcements">
            <div className="header">
                <h1>Announcements</h1>
                <div className="header-controls">
                    <div className="sort-container">
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            label="Sort"
                            // value={sort}

                        >
                            <MenuItem value="latest">Latest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                            {/* ...other sorting options */}
                        </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleNewClick}>
                            New
                        </Button>

                    </div>
                    {showNewAnnouncement && <NewAnnouncementComponent />}
                </div>
            </div>
                <div className="announcement-list-line">
                </div>
            <div className="main-content">
                <div className="filters">
                    <AnnouncementFilter />
                </div>
                <div className="announcement-list">
                    <AnnouncementList announcements={announcementsData} />
                </div>
            </div>

            </div>
        </>
    );
}

export default Announcements;