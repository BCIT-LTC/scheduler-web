// React and third-party libraries
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// Material UI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// Custom hooks
import useCRUD from "../../hooks/useCRUD";

// Custom components
import CustomTextField from "../Shared/CustomTextField";
import CustomCheckbox from "../Shared/CustomCheckbox";
import CustomConfirmationModal from "../Shared/CustomConfirmationModal";


/**
 * User Details Form Page
 *
 * @returns {JSX.Element} - User Details Form Page
 */
export default function UserDetailsForm() {
    const navigate = useNavigate();
    const userDetails = useLocation().state.userdetails;
    // console.log(userDetails);
    const [userId, setUserId] = useState(userDetails.user_id);
    const [firstName, setFirstName] = useState(userDetails.first_name);
    const [lastName, setLastName] = useState(userDetails.last_name);
    const [email, setEmail] = useState(userDetails.email);
    const [samlRole, setSamlRole] = useState(userDetails.saml_role);
    const [appRoles, setAppRoles] = useState(userDetails.app_roles);


    const isFormValid = () => {
        return true;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        performAction: getRoles,
        isSuccessful: isgetRolesSuccessful,
        isLoading: isgetRolesLoading,
        isSubmitted: isgetRolesSubmitted,
        responseError: getRolesResponseError,
        responseData: rolesData
    } = useCRUD();

    const {
        performAction: updateUser,
        isSuccessful: isUpdateUserSuccessful,
        isLoading: isUpdateUserLoading,
        isSubmitted: isUpdateUserSubmitted,
        responseError: updateUserResponseError,
    } = useCRUD();

    useEffect(() => {
        getRoles('get', 'roles');
    }, []);

    const openModal = () => {
        let updatedAppRoles = rolesData.filter((role, index) => {
            let checkbox = document.querySelector(`input[name="app-role-${index}"]`);
            return checkbox && checkbox.checked;
        }).map(role => role);

        setAppRoles(updatedAppRoles);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let app_roles = [];
        if (rolesData.length > 0) {
            for (let index = 0; index < rolesData.length; index++) {
                if (event.target[`app-role-${index}`].checked) {
                    app_roles.push(event.target[`app-role-${index}`].value);
                }
            }
        }

        // if array is the same, alert
        if (app_roles.every((value, index) => value === userDetails.app_roles[index])) {
            alert('No changes detected');
            return;
        }

        let payload = {
            app_roles: app_roles,
        };

        updateUser('patch', 'users', payload, userId);
    };

    return (
        <Container maxWidth="sm">
            <Box id="user-details-form" component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    gap: 2,
                    padding: '1em',
                    justifyContent: 'center'
                }}>
                <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                    View/Edit Roles
                </Typography>
                <Typography variant="p" align="center" color="textSecondary" paragraph>
                    View User details or Edit User Roles
                </Typography>

                <FormControl fullWidth>
                    <CustomTextField fieldLabel="User ID" name="user_id" required={true} defaultState={userId} updateState={setUserId} disabled={true} hideField={true} />
                    <CustomTextField fieldLabel="First Name" name="first_name" required={true} defaultState={firstName} updateState={setFirstName} disabled={true} />
                    <CustomTextField fieldLabel="Last Name" name="last_name" required={true} defaultState={lastName} updateState={setLastName} disabled={true} />
                    <CustomTextField fieldLabel="Email" name="email" required={true} defaultState={email} updateState={setEmail} disabled={true} />
                    <CustomTextField fieldLabel="Logged in as" name="saml_role" required={true} defaultState={samlRole} updateState={setSamlRole} disabled={true} />

                    {isgetRolesLoading ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <CircularProgress size={80} />
                        </Box>
                        :
                        rolesData?.map((role, index) => {
                            return (
                                <CustomCheckbox key={`app-role-${index}`}
                                    label={role}
                                    name={`app-role-${index}`}
                                    value={role}
                                    defaultChecked={appRoles.includes(role)}
                                    checked={appRoles.includes(role)} />
                            );
                        })}

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={() => { navigate("/rolemanagement"); }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            disabled={!isFormValid()}
                            color="primary"
                            onClick={openModal}
                        >
                            Update
                        </Button>
                    </Stack>
                </FormControl>
                <CustomConfirmationModal
                    open={isModalOpen}
                    isSuccessful={isUpdateUserSuccessful}
                    isLoading={isUpdateUserLoading}
                    isSubmitted={isUpdateUserSubmitted}
                    handleClose={closeModal}
                    dialogConfig={{
                        title: 'Update User Roles',
                        content: `Are you sure you want to update the roles for user ${firstName} ${lastName} to: ${appRoles.join(', ')}?`,
                        buttons: [
                            { label: 'Cancel', onClick: closeModal, color: 'secondary', variant: 'outlined' },
                            { label: 'Confirm', type: 'submit', color: 'primary', variant: 'contained', form: 'user-details-form' }
                        ]
                    }}
                    successDialogConfig={{
                        title: 'User Roles Updated',
                        content: `User roles for ${firstName} ${lastName} have been updated successfully to: ${appRoles.join(', ')}.`,
                        onClose: () => { navigate('/rolemanagement'); },
                        buttons: [
                            { label: 'OK', onClick: () => { navigate('/rolemanagement'); }, color: 'primary', variant: 'contained' }
                        ]
                    }}
                    failureDialogConfig={{
                        title: 'Failed to Update User Roles',
                        content: `Failed to update user roles for ${firstName} ${lastName}.`,
                        onClose: closeModal,
                        buttons: [
                            { label: 'Close', onClick: closeModal, color: 'secondary', variant: 'contained' }
                        ]
                    }}
                />
            </Box>
        </Container>
    );
}