import { useContext } from "react";
import { Navigate } from "react-router-dom"

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import { GlobalContext } from '../context/usercontext';

/**
 * Container to display privileged nav links
 * 
 * @returns {JSX.Element} - Admin Area
 */
export default function AdminArea() {

  const globalcontext = useContext(GlobalContext);
  
  return (
    <>
      <Box position="absolute" bottom={0}>
        <ListItemText primary={"Admin Area"} sx={{ ml: 2 }} />
        <List>
            <ListItem disablePadding
                onClick={() => { 
                    window.location.href = "/newevent" }}
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
                onClick={() => { 
                    window.location.href = "/rolemanagement" }}
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
                    <ListItemText primary={"User Management"} />
                </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </>
  );
}