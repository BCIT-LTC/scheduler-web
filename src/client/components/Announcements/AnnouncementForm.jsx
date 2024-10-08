// React and third-party libraries
import { useState, useContext } from "react";
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
import useCRUD from "../../hooks/useCRUD";

// Custom components
import CustomTextField from "../Shared/CustomTextField";
import CustomConfirmationModal from "../Shared/CustomConfirmationModal";
import CustomDisplayData from "../Shared/CustomDisplayData";
import { GlobalContext } from "../../context/usercontext";


dayjs.extend(utc);

/**
 * Announcement Form Page
 *
 * @returns {JSX.Element} - Announcement Form Page
 */
export default function AnnouncementForm() {
    const globalcontext = useContext(GlobalContext);
    const navigate = useNavigate();
    const previousState = useLocation().state;

    let initialState = {
        mode: "create-announcement",
        announcement_id: null,
        title: '',
        description: '',
    };

    if (previousState) {
        if (previousState.mode === 'edit-announcement') {
            initialState = {
                mode: 'edit-announcement',
                announcement_id: previousState.announcement_id,
                title: previousState.title,
                description: previousState.description,
                event: previousState.event ? previousState.event : null
            };
        } else if (previousState.mode === 'create-event-announcement') {
            initialState = {
                mode: 'create-announcement',
                announcement_id: null,
                title: '',
                description: '',
                event: previousState.event
            };

        }
    }

    const [mode, setMode] = useState(initialState.mode);
    const [title, setTitle] = useState(initialState.title);
    const [description, setDescription] = useState(initialState.description);
    const [eventId, setEventId] = useState(initialState?.event?.event_id);
    const announcementEvent = initialState?.event;


    const isFormValid = () => {
        return title && description;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        performAction: createAnnouncement,
        isSuccessful: isCreateAnnouncementSuccessful,
        isLoading: isCreateAnnouncementLoading,
        isSubmitted: isCreateAnnouncementSubmitted,
        responseError: createAnnouncementResponseError,
    } = useCRUD();

    const {
        performAction: updateAnnouncement,
        isSuccessful: isUpdateAnnouncementSuccessful,
        isLoading: isUpdateAnnouncementLoading,
        isSubmitted: isUpdateAnnouncementSubmitted,
        responseError: updateAnnouncementResponseError,
    } = useCRUD();

    const {
        performAction: deleteAnnouncement,
        isSuccessful: isDeleteAnnouncementSuccessful,
        isLoading: isDeleteAnnouncementLoading,
        isSubmitted: isDeleteAnnouncementSubmitted,
        responseError: deleteAnnouncementResponseError,
    } = useCRUD();

    const isSuccessful = isCreateAnnouncementSuccessful || isUpdateAnnouncementSuccessful || isDeleteAnnouncementSuccessful;
    const isLoading = isCreateAnnouncementLoading || isUpdateAnnouncementLoading || isDeleteAnnouncementLoading;
    const isSubmitted = isCreateAnnouncementSubmitted || isUpdateAnnouncementSubmitted || isDeleteAnnouncementSubmitted;
    const responseError = createAnnouncementResponseError || updateAnnouncementResponseError || deleteAnnouncementResponseError;

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
            title: event.target.title.value,
            description: event.target.description.value,
            event_id: event.target.event_id?.value ? event.target.event_id.value : null,
        };

        if (mode === 'create-announcement') {
            payload.created_by = globalcontext.user.email;
            createAnnouncement('create', 'announcements', payload);
        } else if (mode === 'edit-announcement') {
            payload.modified_by = globalcontext.user.email;
            updateAnnouncement('update', 'announcements', payload, initialState.announcement_id);
        } else if (mode === 'delete-announcement') {
            deleteAnnouncement('delete', 'announcements', null, initialState.announcement_id);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box id="announcement-form" component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    gap: 2,
                    padding: '1em',
                    justifyContent: 'center'
                }}>
                <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                    {mode === 'create-announcement' ? 'Create Announcement' : 'Edit Announcement'}
                </Typography>
                <Typography variant="p" align="center" color="textSecondary" paragraph>
                    {mode === 'create-announcement' ? 'Create a new announcement' : 'Edit an existing announcement'}
                </Typography>
                {
                    announcementEvent &&
                    <CustomDisplayData data={announcementEvent} />
                }

                {
                    previousState?.mode === 'create-event-announcement' &&
                    <CustomTextField fieldLabel="Event ID" name="event_id" required={true} defaultState={eventId} updateState={setEventId} disabled={true} hideField={true} />
                }

                <FormControl fullWidth>
                    <CustomTextField fieldLabel="Title" name="title" required={true} defaultState={title} updateState={setTitle} inputProps={{ maxLength: 50 }} />
                    <CustomTextField fieldLabel="Description" name="description" required={true} multiline={true} defaultState={description} updateState={setDescription} inputProps={{ maxLength: 200 }} />

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={() => { navigate("/announcements"); }}
                        >
                            Cancel
                        </Button>
                        {(mode !== 'create-announcement') &&
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={() => { setModalMode('delete-announcement', true); }}
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
                            {mode === 'create-announcement' ? 'Create' : 'Update'}
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
                        title: `${mode === 'create-announcement' ? 'Create' : mode === 'edit-announcement' ? 'Update' : 'Delete'} Announcement`,
                        content: `Are you sure you want to ${mode === 'create-announcement' ? 'create' : mode === 'edit-announcement' ? 'update' : 'delete'} the announcement ${title}?`,
                        buttons: [
                            { label: 'Cancel', onClick: closeModal, color: 'secondary', variant: 'outlined' },
                            { label: 'Confirm', type: 'submit', color: 'primary', variant: 'contained', form: 'announcement-form' }
                        ]
                    }}
                    successDialogConfig={{
                        title: `Announcement ${mode === 'create-announcement' ? 'Created' : mode === 'edit-announcement' ? 'Updated' : 'Deleted'}`,
                        content: `Successfully ${mode === 'create-announcement' ? 'created' : mode === 'edit-announcement' ? 'updated' : 'deleted'} the announcement ${title}.`,
                        onClose: () => { navigate('/announcements'); },
                        buttons: [
                            { label: 'OK', onClick: () => { navigate('/announcements'); }, color: 'primary', variant: 'contained' }
                        ]
                    }}
                    failureDialogConfig={{
                        title: `${mode === 'create-announcement' ? 'Create' : mode === 'edit-announcement' ? 'Update' : 'Delete'} Announcement Failed`,
                        content: `Failed to ${mode === 'create-announcement' ? 'create' : mode === 'edit-announcement' ? 'update' : 'delete'} the announcement ${title}. ${responseError}`,
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