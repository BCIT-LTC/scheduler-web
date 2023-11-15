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
import { useState } from 'react';
import { mockDataUser } from '../../tests/mock-data-user';
import  EditUserModal  from './EditSingle.jsx'
import  EditMultiModal  from './EditMultiple.jsx'
import useGetUsersList from '../../hooks/users/useGetUsersList';
import { GlobalContext } from '../../context/usercontext.js'
import { useContext } from 'react';

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

const SideBar = ({ onFilter }) => {
  const handleFilterClick = (filterValue) => {
    onFilter(filterValue);
  };

  return (
    <Box sx={{ overflow: 'auto', width: '20%', borderRight: '1px solid grey', height: '100vh' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleFilterClick('all')}>
            <ListItemText primary="All Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleFilterClick("instructors")}>
            <ListItemText primary="Instructors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleFilterClick("admins")}>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

const Table = ({ filter }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]); //Track selected users
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSingleUserEdit, setIsSingleUserEdit] = useState(false);
  const { user, isLoggedIn } = useContext(GlobalContext);

  const searchTable = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
  }

  const filteredRows = rows.filter((row) => {
    if (filter === 'all') {
      return (
        row.user.toLowerCase().includes(searchText) ||
        row.email.toLowerCase().includes(searchText) ||
        row.role.toLowerCase().includes(searchText)
      );
    } else if (filter === 'instructors') {
      return (
        row.role.toLowerCase() === 'instructor' &&
        (row.user.toLowerCase().includes(searchText) || row.email.toLowerCase().includes(searchText))
      );
    } else if (filter === 'admins') {
      return (
        row.role.toLowerCase() === 'admin' &&
        (row.user.toLowerCase().includes(searchText) || row.email.toLowerCase().includes(searchText))
      );
    }
    // Make sure to return a value for the default case
    return (
      row.user.toLowerCase().includes(searchText) ||
      row.email.toLowerCase().includes(searchText) ||
      row.role.toLowerCase().includes(searchText)
    );
  });

  const handleEdit = () => {
    if (selectedUsers && selectedUsers.length){
      if (selectedUsers.length === 1) {
        setIsSingleUserEdit(true);
      } else if (selectedUsers.length > 1) {
        setIsSingleUserEdit(false);
      }
      setIsEditModalOpen(true);
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%', padding: '0em 1em' }}>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, padding: '1.3em 0em' }}>
        Role Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1em 0em' }}>
        <TextField label="Search" id="outlined-size-normal" size='small' placeholder='Name, Email, Etc...' onChange={searchTable}/>
        {user.role === 'admin' && (
          <Button onClick = {handleEdit} variant="outlined" sx={{ color: 'grey', borderColor: 'rgb(128,128,128)' }}>Edit Users</Button>
        )}
      </Box>

      <DataGrid
        rows={filteredRows}
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
        onRowSelectionModelChange={(newSelection) => {
          console.log(newSelection);
          setSelectedUsers(newSelection);
        }
      }                                           
      />
      <EditUserModal />

      {isEditModalOpen && isSingleUserEdit && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setIsSingleUserEdit(false);
          }}
          
          userToEdit={selectedUsers[0]}
        />
      )}

      {isEditModalOpen && !isSingleUserEdit && (
        <EditMultiModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setIsSingleUserEdit(false);
          }}
          selectedUsers={selectedUsers}
        />
      )}
    </Box>
  );
}

const UsersTable = () => {
  const [filter, setFilter] = useState('all');

  const applyFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
   <div>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <SideBar onFilter={applyFilter} />
        <Table filter={filter} />
      </Box>
    </div>
  )
}

export default UsersTable ;