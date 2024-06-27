import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useGetUsersList from '../../hooks/users/useGetUsersList';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const columns = [
    { field: 'first_name', headerName: 'First name', flex: 1 },
    { field: 'last_name', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'roles', headerName: 'Roles', flex: 1, valueGetter: (params) => { return params.row.app_roles.join(', ') } },
];

const UserTable = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const {
        getUsersListData,
        getUsersListIsSuccessful,
        getUsersListIsLoading,
        getUsersListResponseError,
        getUsersList } = useGetUsersList();

    useEffect(() => {
        getUsersList();
    }, []);

    const searchTable = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
    };

    const filteredRows = getUsersListData.filter((row) => {
        return (
            row.first_name.toLowerCase().includes(searchText) ||
            row.last_name.toLowerCase().includes(searchText) ||
            row.email.toLowerCase().includes(searchText) ||
            row.department.toLowerCase().includes(searchText)
        );
    });

    return (
        <Box component="div"
            sx={{
                display: 'flex', flexDirection: 'column',
                gap: 2,
                padding: '1em',
                justifyContent: 'center',
            }}>
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                Role Management
            </Typography>
            <Typography variant="h7" align="center" color="textSecondary" paragraph>
                Select a user to view/edit roles
            </Typography>
            <TextField label="Search" id="outlined-size-normal" size='small' placeholder='Name, Email, Etc...' onChange={searchTable} />
            <DataGrid sx={{ width: '100%', height: 'fit-content', wordWrap: "break-word !important;" }}
                rows={filteredRows}
                columns={columns}
                columnVisibilityModel={{
                    // Hide columns role, the other columns will remain visible
                    email: useMediaQuery('(min-width:600px)'),
                    roles: useMediaQuery('(min-width:600px)')
                  }}
                getRowId={(row) => row.user_id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                // checkboxSelection
                disableRowSelectionOnClick
                density='compact'
                // getRowHeight={(params) => "auto"}
                onRowClick={(row) => {
                    navigate(`/userdetails`, { state: { userdetails: row.row } })
                }}
            />
        </Box>
    );
};

export default UserTable;