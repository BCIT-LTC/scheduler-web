// React and third-party libraries
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// Material UI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// Custom hooks
import useCreateLocation from "../../hooks/locations/useCreateLocation";
import useUpdateLocation from "../../hooks/locations/useUpdateLocation";
import useDeleteLocation from "../../hooks/locations/useDeleteLocation";

// Custom components
import CustomTextField from "../Shared/CustomTextField";
import CustomConfirmationModal from "../Shared/CustomConfirmationModal";



dayjs.extend(utc);

/**
 * Location Form Page
 *
 * @returns {JSX.Element} - Location Form Page
 */
export default function LocationForm() {
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
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const {
        createLocationIsSuccessful,
        createLocationIsLoading,
        createLocationIsSubmitted,
        createLocationResponseError,
        createLocation
    } = useCreateLocation();

    const {
        updateLocationIsSuccessful,
        updateLocationIsLoading,
        updateLocationIsSubmitted,
        updateLocationResponseError,
        updateLocation
    } = useUpdateLocation();

    const { deleteLocationIsSuccessful,
        deleteLocationIsLoading,
        deleteLocationIsSubmitted,
        deleteLocationResponseError,
        deleteLocation
    } = useDeleteLocation();


    const isSuccessful = createLocationIsSuccessful || updateLocationIsSuccessful || deleteLocationIsSuccessful;
    const isLoading = createLocationIsLoading || updateLocationIsLoading || deleteLocationIsLoading;
    const isSubmitted = createLocationIsSubmitted || updateLocationIsSubmitted || deleteLocationIsSubmitted;
    const responseError = createLocationResponseError || updateLocationResponseError || deleteLocationResponseError;

    const toggleDelete = () => {
        if (mode === 'edit-location') {
            setMode('delete-location');
        } else if (mode === 'delete-location') {
            setMode('edit-location');
        }
        toggleModal();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'create-location') {
            createLocation(e);
        } else if (mode === 'edit-location') {
            updateLocation(e, initialState.location_id);
        } else if (mode === 'delete-location') {
            deleteLocation(e, initialState.location_id);
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
                <Typography variant="h7" align="center" color="textSecondary" paragraph>
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
                        {(mode === 'edit-location' || 'delete-location') &&
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={toggleDelete}
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
                            onClick={toggleModal}
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
                    handleClose={toggleModal}
                    dialogConfig={{
                        title: `${mode === 'create-location' ? 'Create' : mode === 'edit-location' ? 'Update' : 'Delete'} Location`,
                        content: `Are you sure you want to ${mode === 'create-location' ? 'create' : mode === 'edit-location' ? 'update' : 'delete'} the location ${roomLocation}?`,
                        buttons: [
                            { label: 'Cancel', onClick: toggleDelete, color: 'secondary', variant: 'outlined' },
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
                        onClose: () => { toggleModal(); },
                        buttons: [
                            { label: 'Close', onClick: toggleModal, color: 'secondary', variant: 'contained' }
                        ]
                    }}
                />
            </Box>
        </Container>
    );
}