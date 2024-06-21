import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ListSubheader from '@mui/material/ListSubheader';
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
    const iconMinWidth = { minWidth: 38 };
    const navigate = useNavigate();

    const closeDrawer = () => {
        if (!isLargeScreen) {
            setDrawerOpen(false);
        }
    };

    return (
        <>
            <Box>
                <List
                    aria-labelledby="Admin Area List"
                    subheader={<ListSubheader>Admin Area</ListSubheader>
                    }
                >
                    <ListItem disablePadding
                        onClick={() => {
                            closeDrawer();
                            navigate("/createevent");
                        }}
                    >
                        <ListItemButton aria-label="Create New Event">
                            <ListItemIcon sx={iconMinWidth}>
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
                        <ListItemButton aria-label="Room Management">
                            <ListItemIcon sx={iconMinWidth}>
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
                        <ListItemButton aria-label="Role Management">
                            <ListItemIcon sx={iconMinWidth}>
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