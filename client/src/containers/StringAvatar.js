import { useState, useContext } from "react"
import { GlobalContext } from '../context/usercontext';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logout from "./logout";

/**
 * Hashes a given string to a color code
 * @param {*} string 
 * @returns 
 */
function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

/**
 * Helper function to take first and last initials of a name and create an avatar
 * @param {*} name - the name of the user
 * @returns sx properties and children for the avatar
 */
function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

/**
 * String Avatar component that opens up for details and a logout button
 * @returns {JSX.Element} - StringAvatar
 */
export default function StringAvatar() {
    const globalcontext = useContext(GlobalContext);
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

    return (
        <>
            <Avatar {...stringAvatar(globalcontext.user.first_name.toUpperCase() + " " + globalcontext.user.last_name.toUpperCase())} 
                onClick={userAvatarClick}/>
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
        </>
    );
}