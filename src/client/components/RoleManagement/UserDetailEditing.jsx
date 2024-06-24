import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useGetRoles from '../../hooks/users/useGetRoles';
import useUpdateUser from '../../hooks/users/useUpdateUser';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

const UserDetailEditing = () => {
    const navigate = useNavigate();
    const router_location = useLocation();
    const [userDetails, setUserDetails] = useState(router_location.state.userdetails);
    const { getRolesData, getRolesIsSuccesful, getRolesIsLoading, getRolesResponseError,
        getRoles } = useGetRoles();

    const { updateUserIsSuccessful, updateUserIsLoading, updateUserIsSubmitted, updateUserResponseError,
        updateUser } = useUpdateUser();

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        if (updateUserIsSuccessful) {
            navigate("/rolemanagement");
        }
    }, [updateUserIsSuccessful]);

    const HandleCheckboxClick = (event) => {
        let updatedAppRoles = userDetails.app_roles;
        if (event.target.checked) {
            if (!updatedAppRoles.includes(event.target.value)) {
                updatedAppRoles.push(event.target.value);
            }
        }
        else {
            updatedAppRoles = updatedAppRoles.filter(role => role !== event.target.value);
        }
        setUserDetails(prevState => ({
            ...prevState,
            app_roles: updatedAppRoles
        }));
    }

    const AppRoles = () => {
        return (
            <FormGroup>
                {getRolesData.map((role, index) => {
                    return (
                        <FormControlLabel
                            key={"select_roles_" + index}
                            control={
                                <Checkbox
                                    defaultChecked={userDetails.app_roles.includes(role)}
                                    value={role}
                                    name="app_roles"
                                    onChange={HandleCheckboxClick}
                                />
                            }
                            label={role}
                        >
                        </FormControlLabel>
                    );
                })}
            </FormGroup>
        );
    }

    return (
        <Box id="update-role-form" component="form"
            onSubmit={updateUser}
            sx={{
                display: 'flex', flexDirection: 'column',
                gap: 2,
                padding: '1em',
                justifyContent: 'center'
            }}>
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                {userDetails.first_name} {userDetails.last_name}
            </Typography>
            <Typography variant="h7" align="center" color="textSecondary" paragraph>
                View/Edit Roles
            </Typography>
            <TextField
                sx={{ display: 'none' }}
                id="user_id"
                name="user_id"
                value={userDetails.user_id}
            />

            <TextField
                label="email"
                id="email"
                name="email"
                value={userDetails.email}
            />

            <TextField
                label="logged in as"
                id="saml_role"
                name="saml_role"
                disabled
                value={userDetails.saml_role}
            />

            <FormControl
                error={userDetails.app_roles.length === 0 ? true : false}
                required
                component="fieldset"
                variant="standard"
            >
                <FormLabel component="legend">Select Roles</FormLabel>
                <AppRoles />
                {userDetails.app_roles.length === 0 &&
                    <FormHelperText>At least one role must be selected</FormHelperText>}
            </FormControl>
            {updateUserResponseError &&
                <Typography variant="h7" align="center" color="error" gutterBottom>
                    {updateUserResponseError}
                </Typography>
            }

            <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    fullWidth
                    type="button"
                    variant="outlined"
                    disabled={false}
                    color="primary"
                    onClick={() => { navigate("/rolemanagement") }}
                >
                    <ArrowBackIcon />
                </Button>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="normal"
                    disabled={userDetails.app_roles.length === 0 ? true : false}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
};

export default UserDetailEditing;