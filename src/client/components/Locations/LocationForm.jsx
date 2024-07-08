// React and third-party libraries
import { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// Material UI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// Custom hooks
import useCRUD from "../../hooks/useCRUD";

// Custom components
import CustomTextField from "../Shared/CustomTextField";
import CustomConfirmationModal from "../Shared/CustomConfirmationModal";
import { GlobalContext } from "../../context/usercontext";


/**
 * Location Form Page
 *
 * @returns {JSX.Element} - Location Form Page
 */
export default function LocationForm() {
    const globalcontext = useContext(GlobalContext);
    const navigate = useNavigate();
    const previousState = useLocation().state;

    let initialState = {
        mode: "create-location",
        location_id: null,
        room_location: ''
    };

    if (previousState) {
        if (previousState.mode === 'edit-location') {
            initialState = {
                mode: 'edit-location',
                location_id: previousState.location_id,
                room_location: previousState.room_location
            };
        }
    }

    const [mode, setMode] = useState(initialState.mode);
    const [roomLocation, setRoomLocation] = useState(initialState.room_location);


    const isFormValid = () => {
        return roomLocation;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        performAction: createLocation,
        isSuccessful: isCreateLocationSuccessful,
        isLoading: isCreateLocationLoading,
        isSubmitted: isCreateLocationSubmitted,
        responseError: createLocationResponseError,
    } = useCRUD();

    const {
        performAction: updateLocation,
        isSuccessful: isUpdateLocationSuccessful,
        isLoading: isUpdateLocationLoading,
        isSubmitted: isUpdateLocationSubmitted,
        responseError: updateLocationResponseError,
    } = useCRUD();

    const {
        performAction: deleteLocation,
        isSuccessful: isDeleteLocationSuccessful,
        isLoading: isDeleteLocationLoading,
        isSubmitted: isDeleteLocationSubmitted,
        responseError: deleteLocationResponseError,
    } = useCRUD();

    const isSuccessful = isCreateLocationSuccessful || isUpdateLocationSuccessful || isDeleteLocationSuccessful;
    const isLoading = isCreateLocationLoading || isUpdateLocationLoading || isDeleteLocationLoading;
    const isSubmitted = isCreateLocationSubmitted || isUpdateLocationSubmitted || isDeleteLocationSubmitted;
    const responseError = createLocationResponseError || updateLocationResponseError || deleteLocationResponseError;

    const setModalMode = (modeString, modalBool) => {
        if (modalBool === false) {
            setIsModalOpen(modalBool);
            // set delay to allow modal to close before changing mode
            setTimeout(() => {
                setMode(modeString);
            }, 100);
        } else {
            setMode(modeString);
            setIsModalOpen(modalBool);
        }
    };

    const closeModal = () => {
        setModalMode(initialState.mode, false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        let payload = {
            room_location: event.target.room_location.value
        };

        if (mode === 'create-location') {
            payload.created_by = globalcontext.user.email;
            createLocation('create', 'locations', payload);
        } else if (mode === 'edit-location') {
            payload.modified_by = globalcontext.user.email;
            updateLocation('update', 'locations', payload, initialState.location_id);
        } else if (mode === 'delete-location') {
            deleteLocation('delete', 'locations', null, initialState.location_id);
        }
    };


    return (
        <Container maxWidth="sm">
            <Box id="location-form" component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    gap: 2,
                    padding: '1em',
                    justifyContent: 'center'
                }}>
                <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                    {mode === 'create-location' ? 'Create Location' : 'Edit Location'}
                </Typography>
                <Typography variant="p" align="center" color="textSecondary" paragraph>
                    {mode === 'create-location' ? 'Create a new location' : 'Edit an existing location'}
                </Typography>

                <FormControl fullWidth>
                    <CustomTextField fieldLabel="Room Name" name="room_location" required={true} defaultState={roomLocation} updateState={setRoomLocation} inputProps={{ maxLength: 50 }} />

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={() => { navigate("/locations"); }}
                        >
                            Cancel
                        </Button>
                        {(mode != 'create-location') &&
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={() => { setModalMode('delete-location', true); }}
                            >
                                Delete
                            </Button>
                        }
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            disabled={!isFormValid()}
                            color="primary"
                            onClick={() => { setIsModalOpen(true); }}
                        >
                            {mode === 'create-location' ? 'Create' : 'Update'}
                        </Button>
                    </Stack>
                </FormControl>
                <CustomConfirmationModal
                    open={isModalOpen}
                    isSuccessful={isSuccessful}
                    isLoading={isLoading}
                    isSubmitted={isSubmitted}
                    handleClose={closeModal}
                    dialogConfig={{
                        title: `${mode === 'create-location' ? 'Create' : mode === 'edit-location' ? 'Update' : 'Delete'} Location`,
                        content: `Are you sure you want to ${mode === 'create-location' ? 'create' : mode === 'edit-location' ? 'update' : 'delete'} the location ${roomLocation}?`,
                        buttons: [
                            { label: 'Cancel', onClick: closeModal, color: 'secondary', variant: 'outlined' },
                            { label: 'Confirm', type: 'submit', color: 'primary', variant: 'contained', form: 'location-form' }
                        ]
                    }}
                    successDialogConfig={{
                        title: `Location ${mode === 'create-location' ? 'Created' : mode === 'edit-location' ? 'Updated' : 'Deleted'}`,
                        content: `Successfully ${mode === 'create-location' ? 'created' : mode === 'edit-location' ? 'updated' : 'deleted'} the location ${roomLocation}.`,
                        onClose: () => { navigate('/locations'); },
                        buttons: [
                            { label: 'OK', onClick: () => { navigate('/locations'); }, color: 'primary', variant: 'contained' }
                        ]
                    }}
                    failureDialogConfig={{
                        title: `${mode === 'create-location' ? 'Create' : mode === 'edit-location' ? 'Update' : 'Delete'} Location Failed`,
                        content: `Failed to ${mode === 'create-location' ? 'create' : mode === 'edit-location' ? 'update' : 'delete'} the location ${roomLocation}. ${responseError}`,
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