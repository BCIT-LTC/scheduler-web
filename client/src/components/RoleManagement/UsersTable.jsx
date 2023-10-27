import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { mockDataUser } from '../../tests/mock-data-user';

const columns = [
  { field: 'user', headerName: 'User', flex: 1 },
  { field: 'email', headerName: 'Email',flex: 1 },
  { field: 'role', headerName: 'Role', flex: 1 },
];

const rows = mockDataUser.map((user) => ({
  id: user.id,
  user: `${user.first_name} ${user.last_name}`,
  email: user.email,
  role: user.role
}));

const SideBar = () => {
  return (
    <Box sx={{ overflow: 'auto', width: '20%', borderRight: '1px solid grey', height: '100vh' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="All Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Instructors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

const Table = () => {
  return (
    <Box sx={{ height: 400, width: '100%', padding: '0em 1em' }}>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, padding: '1.3em 0em' }}>
        Role Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0em' }}>
        <TextField label="Search" id="outlined-size-normal" size='small' placeholder='Name, Email, Etc...' />
        <Button variant="outlined" sx={{ color: 'grey', borderColor: 'rgb(128,128,128)' }}>Edit</Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

const UsersTable = () => {
  return (
    <div>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <SideBar />
        <Table />
      </Box>
    </div>
  )
}

export default UsersTable ;