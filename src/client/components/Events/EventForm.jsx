// React and third-party libraries
import { useState, useEffect } from "react";
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
import useGetLocations from "../../hooks/locations/useGetLocations";
import useCreateEvent from "../../hooks/events/useCreateEvent";
import useUpdateEvent from "../../hooks/events/useUpdateEvent";
import useDeleteEvent from "../../hooks/events/useDeleteEvent";
import useCreateSeries from "../../hooks/series/useCreateSeries";
import useUpdateSeries from "../../hooks/series/useUpdateSeries";
import useDeleteSeries from "../../hooks/series/useDeleteSeries";

// Custom components
import SeriesDateTimeForm from "../Series/SeriesDateTimeForm";
import CustomTextField from "../Shared/CustomTextField";
import CustomDatePicker from "../Shared/CustomDatePicker";
import CustomTimePicker from "../Shared/CustomTimePicker";
import CustomCheckbox from "../Shared/CustomCheckbox";
import CustomConfirmationModal from "../Shared/CustomConfirmationModal";
import CustomDisplayData from "../Shared/CustomDisplayData";


dayjs.extend(utc);

/**
 * Event Form Page
 *
 * @returns {JSX.Element} - Event Form Page
 */
export default function EventForm() {
    const navigate = useNavigate();
    const previousState = useLocation().state;

    let initialState = {
        mode: "create-event",
        is_recurring: false,
        summary: "",
        location_id: "",
        start_date: dayjs(),
        end_date: dayjs(),
        start_time: dayjs().set('hour', 8).set('minute', 30),
        end_time: dayjs().set('hour', 14).set('minute', 30),
        facilitator: "",
        description: "",
        status: "CONFIRMED"
    };

    if (previousState) {
        if (previousState.mode === 'edit-event') {
            initialState = {
                mode: 'edit-event',
                event_id: previousState.event_id,
                summary: previousState.summary,
                location_id: previousState.location_id,
                start_date: dayjs(previousState.start_time),
                end_date: dayjs(previousState.end_time),
                start_time: dayjs(previousState.start_time),
                end_time: dayjs(previousState.end_time),
                facilitator: previousState.facilitator,
                description: previousState.description,
                status: previousState.status,
                event_announcement: previousState.event_announcement
            };
        } else if (previousState.mode === 'edit-series') {
            initialState = {
                mode: 'edit-series',
                series_id: previousState.series_id,
                location_id: previousState.series_location_id,
                summary: previousState.series_title,
                is_recurring: true,
                recurrence_frequency: previousState.recurrence_frequency_weeks,
                recurrence_days: previousState.recurrence_frequency_days,
                start_date: dayjs(previousState.start_date),
                end_date: dayjs(previousState.end_date),
                start_time: dayjs(previousState.start_time),
                end_time: dayjs(previousState.end_time),
                facilitator: previousState.facilitator,
                description: previousState.description,
                status: previousState.status
            };
        }
    }

    const [mode, setMode] = useState(initialState.mode);
    const [isRecurring, setIsRecurring] = useState(initialState.is_recurring);
    const { getLocationsData, getLocations } = useGetLocations();
    const [summary, setSummary] = useState(initialState.summary);
    const [locationId, setLocationId] = useState(initialState.location_id);
    const [startDate, setStartDate] = useState(dayjs(initialState.start_date));
    const [endDate, setEndDate] = useState(dayjs(initialState.end_date));
    const [startTime, setStartTime] = useState(dayjs(initialState.start_time));
    const [endTime, setEndTime] = useState(dayjs(initialState.end_time));
    const [facilitator, setFacilitator] = useState(initialState.facilitator);
    const [description, setDescription] = useState(initialState.description);
    const [status, setStatus] = useState(initialState.status);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState(initialState.recurrence_frequency || 1);
    const [recurrenceDays, setRecurrenceDays] = useState(initialState.recurrence_days || [1, 2, 3, 4, 5]);

    const eventAnnouncement = initialState.event_announcement || null;

    //   const [isHoliday, setIsHoliday] = useState(false);
    const statusArray = [{ value: "CONFIRMED", text: "CONFIRMED" }, { value: "TENTATIVE", text: "TENTATIVE" }, { value: "CANCELLED", text: "CANCELLED" }];

    let locationsArray = [];
    // convert locations data to an array of object like this: [{ value: 1, text: 'Location 1' }, { value: 2, text: 'Location 2' }] where value is location_id and text is room_location
    if (getLocationsData) {
        locationsArray = getLocationsData.map((location) => {
            return { value: location.location_id, text: location.room_location };
        });
    }

    const isFormValid = () => {
        return summary && locationId && startDate && endDate && startTime && endTime;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        createEventIsSuccessful,
        createEventIsLoading,
        createEventIsSubmitted,
        createEventResponseError,
        createEvent
    } = useCreateEvent();

    const {
        updateEventIsSuccessful,
        updateEventIsLoading,
        updateEventIsSubmitted,
        updateEventResponseError,
        updateEvent
    } = useUpdateEvent();

    const { deleteEventIsSuccessful,
        deleteEventIsLoading,
        deleteEventIsSubmitted,
        deleteEventResponseError,
        deleteEvent
    } = useDeleteEvent();

    const { createSeriesIsSuccessful,
        createSeriesIsLoading,
        createSeriesIsSubmitted,
        createSeriesResponseError,
        createSeries
    } = useCreateSeries();

    const { updateSeriesIsSuccessful,
        updateSeriesIsLoading,
        updateSeriesIsSubmitted,
        updateSeriesResponseError,
        updateSeries
    } = useUpdateSeries();

    const { deleteSeriesIsSuccessful,
        deleteSeriesIsLoading,
        deleteSeriesIsSubmitted,
        deleteSeriesResponseError,
        deleteSeries
    } = useDeleteSeries();

    const isSuccessful = createEventIsSuccessful || updateEventIsSuccessful || deleteEventIsSuccessful || createSeriesIsSuccessful || updateSeriesIsSuccessful || deleteSeriesIsSuccessful;
    const isLoading = createEventIsLoading || updateEventIsLoading || deleteEventIsLoading || createSeriesIsLoading || updateSeriesIsLoading || deleteSeriesIsLoading;
    const isSubmitted = createEventIsSubmitted || updateEventIsSubmitted || deleteEventIsSubmitted || createSeriesIsSubmitted || updateSeriesIsSubmitted || deleteSeriesIsSubmitted;
    const responseError = createEventResponseError || updateEventResponseError || deleteEventResponseError || createSeriesResponseError || updateSeriesResponseError || deleteSeriesResponseError;

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

    const handleDeleteButton = () => {
        if (mode === 'edit-event') {
            setModalMode('delete-event', true);
        } else if (mode === 'edit-series') {
            setModalMode('delete-series', true);
        }
    };

    const closeModal = () => {
        setModalMode(initialState.mode, false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'create-event') {
            createEvent(e);
        } else if (mode === 'edit-event') {
            updateEvent(e, initialState.event_id);
        } else if (mode === 'create-series') {
            createSeries(e);
        } else if (mode === 'edit-series') {
            updateSeries(e, initialState.series_id);
        } else if (mode === 'delete-event') {
            deleteEvent(e, initialState.event_id);
        } else if (mode === 'delete-series') {
            deleteSeries(e, initialState.series_id);
        }
    };

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        if (mode === 'create-event' && isRecurring) {
            setMode('create-series');
        } else if (mode === 'create-series' && !isRecurring) {
            setMode('create-event');
        }
        // console.log('mode:', mode);
    }, [mode, isRecurring]);


    return (
        <Container maxWidth="sm">
            <Box id="event-form" component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex', flexDirection: 'column',
                    gap: 2,
                    padding: '1em',
                    justifyContent: 'center'
                }}>
                <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                    {mode === 'create-event' ? 'Create Event' : mode === 'edit-event' ? 'Edit Event' : mode === 'create-series' ? 'Create Series' : 'Edit Series'}
                </Typography>
                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                    {mode === 'create-event' ? 'Create a new event' : mode === 'edit-event' ? 'Edit an existing event' : mode === 'create-series' ? 'Create a new series' : 'Edit an existing series'}
                </Typography>

                {eventAnnouncement && <CustomDisplayData data={eventAnnouncement} />}

                <FormControl fullWidth>
                    <CustomTextField fieldLabel={mode === 'create-event' || mode === 'edit-event' ? 'Event Name' : 'Series Name'}
                        name="summary" required={true} defaultState={summary} updateState={setSummary} inputProps={{ maxLength: 200 }} />
                    <CustomTextField fieldLabel="Room" name="location_id" required={true} defaultState={locationId} updateState={setLocationId} selectContent={locationsArray} />

                    {/* Only show checkbox on create-event or create-series mode */}
                    {mode === 'create-event' || mode === 'create-series' ?
                        <CustomCheckbox label="Recurring Event" name="is_recurring" defaultChecked={isRecurring} updateCheckbox={setIsRecurring} />
                        : null}

                    {/* if isRecurring is true, show SeriesDateTimeForm, else show CustomDatePicker and CustomTimePicker */}
                    {isRecurring ?
                        <SeriesDateTimeForm
                            initialStartTime={startTime}
                            initialEndTime={endTime}
                            initialRecurrenceFrequency={recurrenceFrequency}
                            initialRecurrenceDays={recurrenceDays}
                            initialStartDate={startDate}
                            initialEndDate={endDate}
                        />
                        :
                        <>
                            <CustomDatePicker label="Start Date" name="start_date" value={startDate} updateDate={setStartDate} />
                            <CustomTimePicker label="Start Time" name="start_time" value={startTime} updateTime={setStartTime} />
                            <CustomDatePicker label="End Date" name="end_date" value={endDate} updateDate={setEndDate} />
                            <CustomTimePicker label="End Time" name="end_time" value={endTime} updateTime={setEndTime} />
                        </>
                    }

                    <CustomTextField fieldLabel="Facilitator" name="facilitator" defaultState={facilitator} updateState={setFacilitator} inputProps={{ maxLength: 200 }} />
                    <CustomTextField fieldLabel="Description" name="description" multiline={true} defaultState={description} updateState={setDescription} inputProps={{ maxLength: 200 }} />
                    <CustomTextField fieldLabel="Status" name="status" defaultState={status} updateState={setStatus} selectContent={statusArray} />
                    {/* <CustomCheckbox label="Holiday/Closed" name="is_holiday" defaultChecked={isHoliday} updateCheckbox={setIsHoliday} /> */}

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            fullWidth
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={() => { navigate("/calendar"); }}
                        >
                            Cancel
                        </Button>
                        {(mode !== 'create-event' && mode !== 'create-series') &&
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={handleDeleteButton}
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
                            {mode === 'create-event' || mode === 'create-series' ? 'Create' : 'Update'}
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
                        title: `${mode === 'create-event' || mode === 'create-series' ? 'Create' : mode === 'delete-event' || mode === 'delete-series' ? 'Delete' : 'Update'} ${isRecurring ? 'Series' : 'Event'} Confirmation`,
                        content: `Are you sure you want to ${mode === 'create-event' || mode === 'create-series' ? 'create' : mode === 'delete-event' || mode === 'delete-series' ? 'delete' : 'update'} the ${isRecurring ? 'series' : 'event'} ${summary}?`,
                        buttons: [
                            { label: 'Cancel', onClick: closeModal, color: 'secondary', variant: 'outlined' },
                            { label: 'Confirm', type: 'submit', color: 'primary', variant: 'contained', form: 'event-form' }
                        ]
                    }}
                    successDialogConfig={{
                        title: `${isRecurring ? 'Series' : 'Event'} ${mode === 'create-event' || mode === 'create-series' ? 'Created' : mode === 'delete-event' || mode === 'delete-series' ? 'Deleted' : 'Updated'} Successfully`,
                        content: `Successfully ${mode === 'create-event' || mode === 'create-series' ? 'created' : mode === 'delete-event' || mode === 'delete-series' ? 'deleted' : 'updated'} the ${isRecurring ? 'series' : 'event'} ${summary}.`,
                        onClose: () => { navigate('/calendar'); },
                        buttons: [
                            { label: 'OK', onClick: () => { navigate('/calendar'); }, color: 'primary', variant: 'contained' }
                        ]
                    }}
                    failureDialogConfig={{
                        title: `${isRecurring ? 'Series' : 'Event'} ${mode === 'create-event' || mode === 'create-series' ? 'Creation' : mode === 'delete-event' || mode === 'delete-series' ? 'Deletion' : 'Update'} Failed`,
                        content: `Failed to ${mode === 'create-event' || mode === 'create-series' ? 'create' : mode === 'delete-event' || mode === 'delete-series' ? 'delete' : 'update'} the ${isRecurring ? 'series' : 'event'} ${summary}. ${responseError}`,
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