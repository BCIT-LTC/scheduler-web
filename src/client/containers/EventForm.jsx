import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Cookies from 'js-cookie';
import useGetLocations from '../hooks/locations/useGetLocations';
import EventConfirmationModal from '../components/Calendar/EventConfirmation';
import { API_BASE_URL } from '../../constants';
import { GlobalContext } from '../context/usercontext';
import DeleteConfirmationModal from '../components/Shared/DeleteConfirmation';
import Toast from '../components/Shared/Toast';

/**
 * Event Form Page
 *
 * @returns {JSX.Element} - Event Form Page
 */
export default function EventForm() {
  const globalContext = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const locations = useGetLocations().data;
  const eventsUrl = `${API_BASE_URL}/events`;

  const jwt = Cookies.get('jwt');
  const [submitting, setSubmitting] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showToast, setShowToast] = useState(false);

  //converts the recurrence days array to a boolean array
  const initRecurrenceDays = (recurrence_days) => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(false);
    }
    recurrence_days.forEach((day) => {
      switch (day) {
        case 'Monday':
          days[0] = true;
          break;
        case 'Tuesday':
          days[1] = true;
          break;
        case 'Wednesday':
          days[2] = true;
          break;
        case 'Thursday':
          days[3] = true;
          break;
        case 'Friday':
          days[4] = true;
          break;
        case 'Saturday':
          days[5] = true;
          break;
        case 'Sunday':
          days[6] = true;
          break;
        default:
          break;
      }
    });
    return days;
  };

  let defaultValues = {
    location_id:
      locations && locations.length > 0 ? locations[0].location_id : '',
  };

  //for editing events, the event data is passed as state
  if (!!location.state) {
    defaultValues = { ...location.state };
    if (Array.isArray(defaultValues.recurrence_days)) {
      defaultValues.recurrence_days = initRecurrenceDays(
        defaultValues.recurrence_days
      );
    }
  }

  //form edit mode state, will be set to true if the event data is passed as state
  const [editMode, setEditMode] = useState(
    defaultValues.event_id ? true : false
  );

  //form recurrence mode state, will be set to false for new events
  const [editSeriesMode, setEditSerieseMode] = useState(
    defaultValues.editSeries ? true : false
  );
  //form data state is set to default values
  const [formData, setFormData] = useState({
    event_id: defaultValues.event_id,
    summary: defaultValues.summary ?? '',
    location_id: defaultValues.location_id,
    recurring_event: editSeriesMode,
    start_time: defaultValues.start_time
      ? dayjs(defaultValues.start_time)
      : dayjs(),
    end_time: defaultValues.end_time ? dayjs(defaultValues.end_time) : dayjs(),
    recurrence_start_time: defaultValues.start_time
      ? dayjs(defaultValues.start_time)
      : dayjs(),
    recurrence_end_time: defaultValues.end_time
      ? dayjs(defaultValues.end_time)
      : dayjs(),
    recurrence_frequency_weeks: defaultValues.recurrence_frequency_weeks,
    recurrence_days: defaultValues.recurrence_days || [],
    recurrence_start_date: defaultValues.start_date
      ? dayjs(defaultValues.start_date)
      : dayjs(),
    recurrence_end_date: defaultValues.end_date
      ? dayjs(defaultValues.end_date)
      : dayjs(),
    facilitator: defaultValues.facilitator || '',
    description: defaultValues.description || '',
    holiday_closure_event: defaultValues.holiday_closure_event || false,
    created_by: defaultValues.created_by || globalContext.user.email,
    modified_by: globalContext.user.email,
  });

  const validateForm = () => {
    const errors = [];
    if (!formData.summary) {
      errors.push('Event name is required');
    }
    if (!formData.location_id) {
      errors.push('Location is required');
    }
    if (!formData.start_time) {
      errors.push('Start time is required');
    }
    if (!formData.end_time) {
      errors.push('End time is required');
    }
    return errors;
  };

  const [seriesConfirmationOpen, setSeriesConfirmationOpen] = useState(false);

  const handleClose = () => {
    setSeriesConfirmationOpen(false);
  };

  const handleFormChange = (e) => {
    switch (e.target.type) {
      case 'checkbox':
        setFormData({ ...formData, [e.target.name]: e.target.checked });
        break;
      case 'text':
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;
      case 'textarea':
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleDateChange = (dateObject, field) => {
    if (formData[field] === undefined) return;
    setFormData({
      ...formData,
      [field]: formData[field]
        .set('year', dateObject.year() ? dateObject.year() : dayjs().year())
        .set('month', dateObject.month())
        .set('date', dateObject.date()),
    });
  };

  const handleTimeChange = (timeObject, field) => {
    if (formData[field] === undefined) return;
    let updatedTimeObject = dayjs(timeObject)
      .year(timeObject.year())
      .month(timeObject.month())
      .date(timeObject.date())
      .hour(timeObject.hour())
      .minute(timeObject.minute())
      .second(0);
    setFormData({
      ...formData,
      [field]: updatedTimeObject,
    });
  };

  const handleRecurringDaysChange = (e) => {
    const dayNum = parseInt(e.target.name[e.target.name.length - 1]);
    const newRecurringDays = formData.recurrence_days;
    newRecurringDays[dayNum] = e.target.checked;
    setFormData({ ...formData, recurrence_days: newRecurringDays });
  };

  const handleLocationChange = (e) => {
    const room = e.target.value;
    const location = locations.find(
      (location) => location.room_location === room
    );
    const locationId = location.location_id;
    setFormData({ ...formData, location_id: locationId });
  };

  const addEvent = (payload) => {
    fetch(eventsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      response
        .json()
        .then((data) => {
          console.log('API response: ', data);
          if (data && response.status === 201) {
            setOnSuccess(true);
          }
        })
        .catch((error) => {
          setErrors([...errors, error]);
          console.error('API error: ', error);
        });
    });
  };

  const editEvent = (payload) => {
    fetch(`${eventsUrl}/${payload.event_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },

      body: JSON.stringify(payload),
    }).then((response) => {
      response
        .json()
        .then((data) => {
          console.log('API response: ', data);
          if (data && response.status === 200) {
            setOnSuccess(true);
          }
        })
        .catch((error) => {
          setErrors([...errors, error]);
          console.error('API error: ', error);
        });
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      setShowToast(true);
      return;
    }
    //remove the recurrence fields if the event is not recurring
    const payload = { ...formData };
    if (!payload.recurring_event) {
      delete payload.recurrence_start_time;
      delete payload.recurrence_end_time;
      delete payload.recurrence_frequency_weeks;
      delete payload.recurrence_days;
      delete payload.recurrence_start_date;
      delete payload.recurrence_end_date;
    }

    if (editMode && editSeriesMode && !seriesConfirmationOpen) {
      setSeriesConfirmationOpen(true);
      return;
    }
    if (seriesConfirmationOpen) {
      setSeriesConfirmationOpen(false);
    }

    if (editMode) {
      setSubmitting(true);
      editEvent(payload);
    } else {
      addEvent(payload);
    }
  };

  const onCancel = (e) => {
    setOnSuccess(false);
    navigate(-1);
  };

  const onDelete = () => {
    fetch(`${eventsUrl}/${formData.event_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API reponse : ', data);
      })
      .catch((error) => {
        console.error('API error: ', error);
      });
  };

  if (!locations) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ flexGrow: 1, maxWidth: '500px', minWidth: '300px' }}>
          <CardContent
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            <label style={{ fontSize: '1.2em' }}>
              {editMode ? 'Edit Event' : 'New Event'}
            </label>
            <TextField
              label="Event Name"
              variant="outlined"
              required
              name="summary"
              value={formData.summary}
              inputProps={{ maxLength: 50 }}
              onChange={handleFormChange}
              onBlur={() => {
                setFormData({ ...formData, summary: formData.summary.trim() });
              }}
              sx={{ flexGrow: 1, margin: '10px 0' }}
            />
            <TextField
              select
              label="Room"
              required
              name="room_location"
              value={
                locations.find(
                  (room) => formData.location_id == room.location_id
                )?.room_location ?? ''
              }
              onChange={(e) => {
                handleLocationChange(e);
              }}
              sx={{ flexGrow: 1, margin: '10px 0' }}
            >
              {locations.map((room) => {
                return (
                  <MenuItem key={room.location_id} value={room.room_location}>
                    {room.room_location}
                  </MenuItem>
                );
              })}
            </TextField>

            {!editMode && (
              <FormControlLabel
                control={
                  <Checkbox
                    name="recurring_event"
                    checked={formData.recurring_event}
                    onChange={handleFormChange}
                  />
                }
                label="Recurring Event"
              ></FormControlLabel>
            )}
            {
              //if recurring event is checked, show the recurring event options
              formData.recurring_event ? (
                <>
                  <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                    <label>Event Time*</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileTimePicker
                        label="Start"
                        name="recurrence_start_time"
                        required
                        defaultValue={formData.recurrence_start_time}
                        sx={{ flexGrow: 1, margin: '10px 0' }}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <ScheduleIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'recurrence_start_time');
                        }}
                      />
                      <MobileTimePicker
                        label="End"
                        name="recurrence_end_time"
                        required
                        minTime={formData.recurrence_start_time}
                        defaultValue={formData.recurrence_end_time}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <ScheduleIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'recurrence_end_time');
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Recur every
                      <TextField
                        name="recurrence_frequency_weeks"
                        type="number"
                        size="small"
                        value={formData.recurrence_frequency_weeks}
                        onChange={(e) => {
                          var value = parseInt(e.target.value, 10);
                          const max = 52;
                          const min = 1;
                          if (value > max) value = max;
                          if (value < min) value = min;
                          setFormData({
                            ...formData,
                            recurrence_frequency_weeks: value,
                          });
                        }}
                        sx={{
                          margin: '0 10px',
                          width: '70px',
                          textAlign: 'center',
                        }}
                      />
                      week(s) on:
                    </div>
                    <div
                      role="group"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '10px',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="recurrence_days_0"
                            checked={formData.recurrence_days[0]}
                            onChange={handleRecurringDaysChange}
                          />
                        }
                        label="Monday"
                      ></FormControlLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="recurrence_days_1"
                            checked={formData.recurrence_days[1]}
                            onChange={handleRecurringDaysChange}
                          />
                        }
                        label="Tuesday"
                      ></FormControlLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="recurrence_days_2"
                            checked={formData.recurrence_days[2]}
                            onChange={handleRecurringDaysChange}
                          />
                        }
                        label="Wednesday"
                      ></FormControlLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="recurrence_days_3"
                            checked={formData.recurrence_days[3]}
                            onChange={handleRecurringDaysChange}
                          />
                        }
                        label="Thursday"
                      ></FormControlLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="recurrence_days_4"
                            checked={formData.recurrence_days[4]}
                            onChange={handleRecurringDaysChange}
                          />
                        }
                        label="Friday"
                      ></FormControlLabel>
                    </div>
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                    <label>Range of recurrence</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="recurrence_start_date"
                        label="Start Date (dd/mm/yyyy)"
                        format="DD/MM/YYYY"
                        defaultValue={formData.recurrence_start_date}
                        required
                        disablePast={true}
                        sx={{ flexGrow: 1, margin: '10px 0' }}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <CalendarTodayIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleDateChange(dateObject, 'recurrence_start_date');
                        }}
                      />
                      <DatePicker
                        name="recurrence_end_date"
                        label="End Date (dd/mm/yyyy)"
                        format="DD/MM/YYYY"
                        defaultValue={formData.recurrence_end_date}
                        required
                        minDate={formData.recurrence_start_date}
                        disablePast={true}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <CalendarTodayIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleDateChange(dateObject, 'recurrence_end_date');
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                    <label>Start Date*</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="start_time"
                        label="Date (dd/mm/yyyy)"
                        format="DD/MM/YYYY"
                        defaultValue={formData.start_time}
                        required
                        disablePast={true}
                        sx={{ flexGrow: 1, margin: '10px 0' }}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <CalendarTodayIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'start_time');
                        }}
                      />
                      <MobileTimePicker
                        label="Time"
                        name="start_time"
                        required
                        defaultValue={formData.start_time}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <ScheduleIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'start_time');
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                    <label>End Date*</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="end_time"
                        label="Date (dd/mm/yyyy)"
                        format="DD/MM/YYYY"
                        required
                        disablePast={true}
                        minDate={formData.start_time}
                        sx={{ flexGrow: 1, margin: '10px 0' }}
                        defaultValue={formData.end_time}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <CalendarTodayIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'end_time');
                        }}
                      />
                      <MobileTimePicker
                        name="end_time"
                        label="Time"
                        required
                        defaultValue={formData.end_time}
                        slotProps={{
                          textField: {
                            variant: 'filled',
                            style: {},
                            InputProps: {
                              endAdornment: (
                                <ScheduleIcon sx={{ opacity: '0.5' }} />
                              ),
                            },
                          },
                        }}
                        onChange={(dateObject) => {
                          handleTimeChange(dateObject, 'end_time');
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </>
              )
            }

            <TextField
              name="facilitator"
              label="Facilitator"
              variant="outlined"
              inputProps={{ maxLength: 50 }}
              value={formData.facilitator}
              onChange={handleFormChange}
              sx={{ flexGrow: 1, margin: '10px 0' }}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              minRows={2}
              maxRows={4}
              value={formData.description}
              inputProps={{ maxLength: 200 }}
              onChange={handleFormChange}
              sx={{ flexGrow: 1, margin: '10px 0' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="holiday_closure_event"
                  checked={formData.holiday_closure_event}
                  onChange={handleFormChange}
                />
              }
              label="Holiday/Closure Event"
            />
            <CardActions
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <Button
                onClick={onCancel}
                variant="outlined"
                color="warning"
                size="normal"
              >
                CANCEL
              </Button>
              {editMode && (
                <DeleteConfirmationModal
                  onConfirm={onDelete}
                  onCancel={onCancel}
                >
                  <>
                    <h2>Delete Event</h2>
                    <p>Are you sure you want to delete this event?</p>
                  </>
                </DeleteConfirmationModal>
              )}
              <EventConfirmationModal
                onSave={onSubmit}
                isOpen={onSuccess}
                onCancel={onCancel}
              />
            </CardActions>
          </CardContent>
        </Card>
        <Modal open={seriesConfirmationOpen} onClose={handleClose}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                zIndex: '100',
                width: '70%',
                p: 2,
                boxShadow: 1,
                borderRadius: 2,
                position: 'absolute',
                border: '3px red solid',
              }}
            >
              <DisabledByDefaultIcon
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: 'grey',
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box display="flex" justifyContent="center" color="red">
                <h2>WARNING</h2>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ border: 'black dashed 1px', padding: '10px' }}
              >
                <p>
                  Updating this event series will{' '}
                  <span style={{ fontWeight: 600 }}>replace ALL</span> existing
                  events within the series. Are you sure you want to proceed?
                </p>
              </Box>
              <Box display="flex" justifyContent="center" padding="1em 0 0 0">
                <Button
                  variant="outlined"
                  sx={{ margin: '0 15px' }}
                  onClick={() => {
                    setSeriesConfirmationOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: '0 15px' }}
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </Box>
            </Card>
          </Box>
        </Modal>
      </Box>
      <Toast
        messages={errors}
        open={showToast}
        handleClose={() => setShowToast(false)}
      />
    </form>
  );
}
