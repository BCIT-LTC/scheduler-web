import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';


/**
 * Container to display privileged nav links
 * 
 * @returns {JSX.Element} - Admin Area
 */
export default function AdminArea({ setDrawerOpen, isLargeScreen }) {
    const navigate = useNavigate();

    const closeDrawer = () => {
        if (!isLargeScreen) {
            setDrawerOpen(false);
        }
    };

    return (
        <>
            <Box position="absolute" bottom={0}>
                <ListItemText primary={"Admin Area"} sx={{ ml: 2 }} />
                <List>
                    <ListItem disablePadding
                        onClick={() => {
                            closeDrawer();
                            navigate("/createevent");
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
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create New Event"} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <List>
                    <ListItem disablePadding
                        onClick={() => { closeDrawer(); navigate("/locations"); }}
                    >
                        <ListItemButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ListItemIcon>
                                <ApartmentIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Room Management"} />
                        </ListItemButton>
                    </ListItem>
                </List>


                <List>
                    <ListItem disablePadding
                        onClick={() => { closeDrawer(); navigate("/rolemanagement"); }}
                    >
                        <ListItemButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Role Management"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </>
    );
}