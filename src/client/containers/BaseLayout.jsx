import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { GlobalContext } from '../context/usercontext';
import useGetAnnouncements from '../hooks/announcements/useGetAnnouncements';
import useCheckIfPermitted from '../hooks/users/useCheckIfPermitted';
import AdminArea from './AdminArea';
import LoginModal from './LoginModal';
import StringAvatar from './StringAvatar';
import AnnouncementAlert from '../components/Announcements/AnnouncementAlert';
import AnnouncementBadge from '../components/Announcements/AnnouncementBadge';

const theme = createTheme();

export default function BaseLayout() {
    const theme = createTheme();
    const drawerWidth = 240;

    const navigate = useNavigate();
    const globalcontext = useContext(GlobalContext);
    const [drawerOpen, setDrawerOpen] = useState(true); // Drawer is open by default
    const [announcementsNum, setAnnouncementsNum] = useState(-1);
    const isAdmin = useCheckIfPermitted({ roles_to_check: ['admin'] });
    const { getAnnouncementsData, getAnnouncements } = useGetAnnouncements();
    const isHomePage = window.location.pathname === "/calendar";
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const [drawerVariant, setDrawerVariant] = useState('persistent');

    let announcementsData = isHomePage ? getAnnouncementsData : null; // Only show announcements on the home page

    const topBarStyles = {
        width: { lg: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%', xs: '100%' },
        ml: { lg: drawerOpen ? `${drawerWidth}px` : '0px', xs: '0px' },
        transition: theme.transitions.create(['margin', 'width'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen })
    };
    const iconMinWidth = { minWidth: 38 };
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // Function to select the announcement to display and checks for undismissed notifications and displays one as alert
    const selectAnnouncementToDisplay = () => {
        if (!announcementsData) return null;

        const undismissed = announcementsData.filter((announcement) => {
            const cacheKey = `Openlab-${announcement.announcement_id}-${announcement.created_at}`;
            return !localStorage.getItem(cacheKey);
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const num = undismissed.length;
        if (num !== announcementsNum) setAnnouncementsNum(num);
        //if there are no undismissed announcements, return null
        if (num === 0) return null;

        const cacheKey = `Openlab-${undismissed[0].announcement_id}-${undismissed[0].created_at}`;
        return <AnnouncementAlert
            title={undismissed[0].title}
            message={undismissed[0].description}
            cacheKey={cacheKey}
            onDismiss={() => {
                localStorage.setItem(cacheKey, JSON.stringify(true));
                setAnnouncementsNum(num - 1);
            }} />;
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                await getAnnouncements();
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnnouncements();
    }, []);


    useEffect(() => {
        if (isLargeScreen) {
            setDrawerOpen(true);
            setDrawerVariant('persistent');
        } else {
            setDrawerOpen(false);
            setDrawerVariant('temporary');
        }
    }, [isLargeScreen]);

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={topBarStyles}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {isSmallScreen ? 'OpenLabs' : 'Welcome to OpenLabs'}
                        </Typography>
                        {isHomePage && (
                            <Badge badgeContent={announcementsNum > 0 ? announcementsNum : null}
                                color="warning"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        transform: 'translate(-40%, -10%)',
                                    },
                                }}
                            >
                                <AnnouncementBadge />
                            </Badge>
                        )}
                        {globalcontext.user.is_logged_in ? <StringAvatar /> : <LoginModal />}
                    </Toolbar>
                </AppBar>
            </Box>
            {isHomePage ?
                <div style={{
                    marginTop: `${theme.mixins.toolbar.minHeight + (isSmallScreen ? 0 : 8)}px`,
                    marginLeft: isLargeScreen && drawerOpen ? `${drawerWidth}px` : '0px',
                    transition: theme.transitions.create(['margin', 'width'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen })
                }}>
                    {selectAnnouncementToDisplay()}
                </div>
                : null}
            <Drawer
                variant={drawerVariant}
                anchor='left'
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{ BackdropProps: { invisible: isLargeScreen } }}
                sx={{
                    position: 'fixed', // Make the Drawer cover the entire viewport
                    height: '100vh',
                    width: { lg: drawerWidth },
                    maxWidth: `${drawerWidth}px`,
                    flexShrink: 0,
                    overflow: 'hidden', // Prevent the Drawer from scrolling
                    '& .MuiDrawer-paper': {
                        position: 'fixed', // Make the Drawer cover the entire viewport
                        height: '100vh',
                        width: { lg: drawerWidth },
                        boxSizing: 'border-box',
                        overflow: 'hidden', // Prevent the Drawer from scrolling
                    },
                }}
            >
                <Box display="flex" flexDirection="column" height="100%">
                    <Box flexGrow={1}>
                        <List>
                            <ListItem disablePadding onClick={handleDrawerClose}>
                                <ListItemButton aria-label="menu">
                                    <ListItemIcon sx={{ width: "100%", justifyContent: "end", textAlign: "right" }}>
                                        <ChevronLeftIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding
                                onClick={() => {
                                    if (!isLargeScreen) {
                                        setDrawerOpen(false);
                                    }
                                    navigate("/announcements");
                                }}
                            >
                                <ListItemButton aria-label="announcements">
                                    <ListItemIcon sx={iconMinWidth}>
                                        <AnnouncementIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Announcements"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding
                                onClick={() => {
                                    if (!isLargeScreen) {
                                        setDrawerOpen(false);
                                    }
                                    navigate("/calendar");
                                }}
                            >
                                <ListItemButton aria-label="calendar">
                                    <ListItemIcon sx={iconMinWidth}>
                                        <TodayIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Calendar"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    {isAdmin && (
                        <AdminArea setDrawerOpen={setDrawerOpen} isLargeScreen={isLargeScreen} />
                    )}
                </Box>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: `calc(100% - ${(drawerOpen && isLargeScreen) ? drawerWidth : 0}px)`,
                    ml: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Fragment >
    );
}