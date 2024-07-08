import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid } from '@mui/x-data-grid';
import useCRUD from '../../hooks/useCRUD';

const columns = [
    { field: 'first_name', headerName: 'First name', flex: 1 },
    { field: 'last_name', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'roles', headerName: 'Roles', flex: 1, valueGetter: (params) => params.row.app_roles.join(', ') },
];

const UserTable = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const {
        performAction: getUsers,
        isSuccessful: isgetUsersSuccessful,
        isLoading: isgetUsersLoading,
        isSubmitted: isgetUsersSubmitted,
        responseError: getUsersResponseError,
        responseData: usersData
    } = useCRUD();

    useEffect(() => {
        getUsers('get', 'users');
    }, []);

    const searchTable = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
    };

    const filteredRows = (usersData || []).filter((row) => {
        return (
            row.first_name.toLowerCase().includes(searchText) ||
            row.last_name.toLowerCase().includes(searchText) ||
            row.email.toLowerCase().includes(searchText) ||
            row.department.toLowerCase().includes(searchText)
        );
    });

    const isEmailVisible = useMediaQuery('(min-width:600px)');
    const areRolesVisible = useMediaQuery('(min-width:600px)');

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
            <Typography variant="p" align="center" color="textSecondary" paragraph>
                Select a user to view/edit roles
            </Typography>
            {isgetUsersLoading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircularProgress size={80} />
                </Box>
                :
                <>
                    <TextField label="Search" id="outlined-size-normal" size='small' placeholder='Name, Email, Etc...' onChange={searchTable} />
                    <DataGrid sx={{ width: '100%', height: 'fit-content', wordWrap: "break-word !important;" }}
                        rows={filteredRows}
                        columns={columns}
                        columnVisibilityModel={{
                            email: isEmailVisible,
                            roles: areRolesVisible
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
                        disableRowSelectionOnClick
                        density='compact'
                        onRowClick={(row) => {
                            navigate(`/userdetails`, { state: { userdetails: row.row } });
                        }}
                    />
                </>
            }
        </Box>
    );
};

export default UserTable;