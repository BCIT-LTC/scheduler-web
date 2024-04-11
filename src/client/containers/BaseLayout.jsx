import { Outlet, Navigate, Link } from "react-router-dom"
import { Fragment, useState, useContext } from "react"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';

import Drawer from '@mui/material/Drawer';
import TodayIcon from '@mui/icons-material/Today';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, alpha, ThemeProvider } from '@mui/material/styles';
import AdminArea from './AdminArea';
import LoginModal from './LoginModal';
import StringAvatar from './StringAvatar';
import useGetAnnouncements from '../hooks/announcements/useGetAnnouncement';
import AnnouncementAlert from '../components/Announcements/AnnouncementAlert';
import { GlobalContext } from '../context/usercontext';

export default function BaseLayout() {
    const globalcontext = useContext(GlobalContext);
    const [Draweropen, setDraweropen] = useState(false);
    const [announcementsNum, setAnnouncementsNum] = useState(-1);
    let announcementsData = null;

    //check if the current page is the home page
    const isHomePage = window.location.pathname === "/calendar";

    //get announcements if on the home page
    if(isHomePage && !announcementsData) {
        announcementsData = useGetAnnouncements().announcements;
    }

    //checks for undismissed notifications and displays one as alert
    const selectAnnouncementToDisplay = () => {
        const undismissed = announcementsData.filter((announcement) => {
            const cacheKey = `Openlab-${announcement.id}-${announcement.posted_date}`;
            return !localStorage.getItem(cacheKey);
        }).sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

        const num = undismissed.length;
        if (num !== announcementsNum) setAnnouncementsNum(num);
        //if there are no undismissed announcements, return null
        if (num === 0) return null;

        const cacheKey = `Openlab-${undismissed[0].id}-${undismissed[0].posted_date}`;
        return <AnnouncementAlert
            title={undismissed[0].title}
            message={undismissed[0].description}
            cacheKey={cacheKey}
            onDismiss={() => {
                localStorage.setItem(cacheKey, JSON.stringify(true));
                setAnnouncementsNum(num - 1);
            }} />;
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDraweropen(open);
    };

    //create a button theme for the login button
    const greyBase = '#EEEEEE';
    const primaryBlue = '#2196f3';
    const theme = createTheme({
        palette: {
            inversePrimary: {
                main: greyBase,
                light: alpha(greyBase, 0.5),
                dark: alpha(greyBase, 0.9),
                contrastText: primaryBlue,
            },
        },
    });

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome to OpenLabs
                        </Typography>
                        {isHomePage && <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                            onClick={() => { 
                                window.location.href = "/announcements" }}
                        >
                            <Badge badgeContent={announcementsNum} color="warning">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>}
                        {globalcontext.user.is_logged_in ?
                            <StringAvatar /> :
                            <ThemeProvider theme={theme}>
                                <LoginModal />
                            </ThemeProvider>}
                    </Toolbar>
                </AppBar>
            </Box>
            {isHomePage ? selectAnnouncementToDisplay() : null}
            <Drawer
                anchor='left'
                open={Draweropen}
                onClose={(ev, reason) => setDraweropen(false)}
            >
                <List>
                    <ListItem disablePadding
                        onClick={() => {
                            window.location.href = "/announcements"
                        }}
                    >
                        <ListItemButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ListItemIcon>
                                <AnnouncementIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Announcements"} />
                        </ListItemButton>
                    </ListItem>
                </List>


                <List>
                    <ListItem disablePadding
                        onClick={() => { window.location.href = "/calendar" }}
                    >
                        <ListItemButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ListItemIcon>
                                <TodayIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Calendar"} />
                        </ListItemButton>
                    </ListItem>
                </List>

                {globalcontext.user.is_logged_in ? <List>
                    {globalcontext.user.app_role && (globalcontext.user.app_role === "admin" || globalcontext.user.app_role === "instructor") && (
                        <ListItem disablePadding
                            onClick={() => { window.location.href = "/rolemanagement" }}
                        >
                            <ListItemButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Role administration"} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List> : null}
                {globalcontext.user.is_logged_in && (globalcontext.user.app_role === "admin") &&
                    <AdminArea />}
            </Drawer>
            <Outlet />
        </Fragment >
    )
}