import { Outlet, Navigate, Link } from "react-router-dom"
import { Fragment, useState, useContext } from "react"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import Drawer from '@mui/material/Drawer';
import TodayIcon from '@mui/icons-material/Today';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, alpha, ThemeProvider } from '@mui/material/styles';

import { GlobalContext } from '../context/usercontext';
import logout from "./logout";

export default function BaseLayout() {
    const globalcontext = useContext(GlobalContext);
    const [Draweropen, setDraweropen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const userAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    };

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



                        {globalcontext.user.is_logged_in ?
                            <>
                                <Avatar
                                    onClick={userAvatarClick}
                                >
                                    <PersonIcon />
                                </Avatar>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <List>
                                        <ListItem
                                            onClick={handleClose}
                                        >
                                            <ListItemText
                                                primary={globalcontext.user.first_name + " " + globalcontext.user.last_name}
                                                secondary={globalcontext.user.email}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Role"
                                                secondary={globalcontext.user.role}
                                            />
                                        </ListItem>
                                        <Divider />
                                        <MenuList>
                                            <MenuItem
                                                onClick={handleLogout}
                                            >
                                                <ListItemIcon>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText>Logout</ListItemText>
                                            </MenuItem>
                                        </MenuList>
                                    </List>
                                </Menu>
                            </> :
                            <ThemeProvider theme={theme}>
                                <form className="form" action="/auth/login" method="post">
                                    <Button variant="contained" color="inversePrimary" type="submit">
                                        Login
                                    </Button>
                                </form>

                            </ThemeProvider>}
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor='left'
                open={Draweropen}
                onClose={(ev, reason) => setDraweropen(false)}
            >
                <List>
                    <ListItem disablePadding
                        onClick={() => { 
                            window.location.href = "/announcements" }}
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
                    {globalcontext.user.role && (globalcontext.user.role === "admin" || globalcontext.user.role === "instructor") && (
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
            </Drawer>
            <Outlet />
        </Fragment >
    )
}