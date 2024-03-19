import * as React from 'react';
import { useState, useEffect } from "react"
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

/**
 * Event Form Page
 * 
 * @returns {JSX.Element} - Event Form Page
 */
export default function EventForm() {

    const location = useLocation();
    const navigate = useNavigate();

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
    }

    //hardcoded room options for location select
    const roomOptions = ["SE12-316", "SE12-200", "NW4-328", "NW4-3086"];

    let defaultValues = {};

    //for editing events, the event data is passed as state
    if (location.state) {
        defaultValues = { ...location.state };
        if (Array.isArray(defaultValues.recurrence_days)) {
            defaultValues.recurrence_days = initRecurrenceDays(defaultValues.recurrence_days);
        }
    }

    //form edit mode state, will be set to true if the event data is passed as state
    const [editMode, setEditMode] = useState(defaultValues.id ? true : false);

    //form recurrence mode state, will be set to false for new events
    const [editSeriesMode, setEditSerieseMode] = useState(defaultValues.editSeries ? true : false);

    //form data state is set to default values
    const [formData, setFormData] = useState({
        id: defaultValues.id,
        event_name: defaultValues.summary || defaultValues.series_title || "",
        location: defaultValues.location,
        recurring_event: editSeriesMode,
        start_time: defaultValues.start_time ? dayjs(defaultValues.start_time) : dayjs(),
        end_time: defaultValues.end_time ? dayjs(defaultValues.end_time) : dayjs(),
        recurrence_start_time: defaultValues.start_time ? dayjs(defaultValues.start_time) : dayjs(),
        recurrence_end_time: defaultValues.end_time ? dayjs(defaultValues.end_time) : dayjs(),
        recurrence_interval: defaultValues.recurrence_frequency_weeks,
        recurrence_days: defaultValues.recurrence_days || [],
        recurrence_start_date: defaultValues.start_date ? dayjs(defaultValues.start_date) : dayjs(),
        recurrence_end_date: defaultValues.end_date ? dayjs(defaultValues.end_date) : dayjs(),
        facilitator: defaultValues.facilitator || "",
        description: defaultValues.description || "",
        holiday_closure_event: defaultValues.holiday_closure_event || false
    });

    const handleFormChange = (e) => {
        switch (e.target.type) {
            case "checkbox":
                setFormData({ ...formData, [e.target.name]: e.target.checked });
                break;
            case "text":
                setFormData({ ...formData, [e.target.name]: e.target.value });
                break;
            case "textarea":
                setFormData({ ...formData, [e.target.name]: e.target.value });
                break;
        }
    }

    const handleDateChange = (dateObject, field) => {
        if (formData[field] === undefined) return;
        setFormData(
            {
                ...formData,
                [field]: formData[field]
                    .set('year', dateObject.year())
                    .set('month', dateObject.month())
                    .set('date', dateObject.date())
            })
    }

    const handleTimeChange = (timeObject, field) => {
        if (formData[field] === undefined) return;
        setFormData(
            {
                ...formData,
                [field]: formData[field]
                    .set('hour', timeObject.hour())
                    .set('minute', timeObject.minute())
                    .set('second', 0)
            })
    }

    const handleRecurringDaysChange = (e) => {
        const dayNum = parseInt(e.target.name[e.target.name.length - 1]);
        const newRecurringDays = formData.recurrence_days;
        newRecurringDays[dayNum] = e.target.checked;
        setFormData({ ...formData, recurrence_days: newRecurringDays });
    }

    //TODO: Implement the submit function
    const onSubmit = (e) => {
        e.preventDefault();
        //remove the recurrence fields if the event is not recurring
        const payload = { ...formData };
        if (!payload.recurring_event) {
            delete payload.recurrence_start_time;
            delete payload.recurrence_end_time;
            delete payload.recurrence_interval;
            delete payload.recurrence_days;
            delete payload.recurrence_start_date;
            delete payload.recurrence_end_date;
        }

        console.log("formData payload: ", payload)
    }

    const onCancel = (e) => {
        navigate(-1);
    }

    //TODO: Implement the delete function
    const onDelete = (e) => { console.log("delete event") }



    return (
        <form onSubmit={onSubmit}>
            <Box sx={{ width: '100%', height: '100%', display: "flex", justifyContent: "center" }}>
                <Card sx={{ flexGrow: 1, maxWidth: '500px', minWidth: '300px' }} >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
                        <label style={{ fontSize: "1.2em" }}>{editMode ? 'Edit Event' : 'New Event'}</label>
                        <TextField
                            label="Event Name"
                            variant="outlined"
                            required
                            name="event_name"
                            value={formData.event_name}
                            inputProps={{ maxLength: 50 }}
                            onChange={handleFormChange}
                            sx={{ flexGrow: 1, margin: '10px 0' }}
                        />
                        <TextField
                            select
                            label="Room"
                            required
                            name="location"
                            value={formData.location}
                            onChange={(e) => { setFormData({ ...formData, location: e.target.value }) }}
                            sx={{ flexGrow: 1, margin: '10px 0' }}
                        >
                            {roomOptions.map((room, index) => {
                                return <MenuItem key={index} value={room}>{room}</MenuItem>;
                            })}
                        </TextField>

                        {!editMode && <FormControlLabel control={<Checkbox
                            name="recurring_event"
                            checked={formData.recurring_event}
                            onChange={handleFormChange}
                        />}
                            label="Recurring Event">
                        </FormControlLabel>}
                        {
                            //if recurring event is checked, show the recurring event options
                            formData.recurring_event ?
                                (
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
                                                            InputProps: { endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} /> }
                                                        },
                                                    }}
                                                    onChange={(dateObject) => { handleTimeChange(dateObject, "recurrence_start_time") }}
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
                                                            InputProps: { endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} /> }
                                                        },
                                                    }}
                                                    onChange={(dateObject) => { handleTimeChange(dateObject, "recurrence_end_time") }}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                        <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>Recur every
                                                <TextField
                                                    name="recurrence_interval"
                                                    type="number"
                                                    size="small"
                                                    value={formData.recurrence_interval}
                                                    onChange={(e) => {
                                                        var value = parseInt(e.target.value, 10);
                                                        const max = 52;
                                                        const min = 1;
                                                        if (value > max) value = max;
                                                        if (value < min) value = min;
                                                        setFormData({ ...formData, recurrence_interval: value })
                                                    }}
                                                    sx={{ margin: '0 10px', width: "70px", textAlign: "center" }}
                                                />
                                                week(s) on:</div>
                                            <div role="group" style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                                <FormControlLabel control={<Checkbox
                                                    name="recurrence_days_0"
                                                    checked={formData.recurrence_days[0]}
                                                    onChange={handleRecurringDaysChange}
                                                />}
                                                    label="Monday">
                                                </FormControlLabel>
                                                <FormControlLabel control={<Checkbox
                                                    name="recurrence_days_1"
                                                    checked={formData.recurrence_days[1]}
                                                    onChange={handleRecurringDaysChange}
                                                />}
                                                    label="Tuesday">
                                                </FormControlLabel>
                                                <FormControlLabel control={<Checkbox
                                                    name="recurrence_days_2"
                                                    checked={formData.recurrence_days[2]}
                                                    onChange={handleRecurringDaysChange}
                                                />}
                                                    label="Wednesday">
                                                </FormControlLabel>
                                                <FormControlLabel control={<Checkbox
                                                    name="recurrence_days_3"
                                                    checked={formData.recurrence_days[3]}
                                                    onChange={handleRecurringDaysChange}
                                                />}
                                                    label="Thursday">
                                                </FormControlLabel>
                                                <FormControlLabel control={<Checkbox
                                                    name="recurrence_days_4"
                                                    checked={formData.recurrence_days[4]}
                                                    onChange={handleRecurringDaysChange}
                                                />}
                                                    label="Friday">
                                                </FormControlLabel>
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
                                                            InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                                        },
                                                    }}
                                                    onChange={(dateObject) => { handleDateChange(dateObject, "recurrence_start_date") }}
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
                                                            InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                                        },
                                                    }}
                                                    onChange={(dateObject) => { handleDateChange(dateObject, "recurrence_end_date") }}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </>) :
                                (<>
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
                                                        InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                                    },
                                                }}
                                                onChange={(dateObject) => { handleDateChange(dateObject, "start_time") }}
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
                                                        InputProps: { endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} /> }
                                                    },
                                                }}
                                                onChange={(dateObject) => { handleTimeChange(dateObject, "start_time") }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                    <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}
                                    >
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
                                                        InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                                    },
                                                }}
                                                onChange={(dateObject) => { handleDateChange(dateObject, "end_time") }}
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
                                                        InputProps: { endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} /> }
                                                    },
                                                }}
                                                onChange={(dateObject) => { handleTimeChange(dateObject, "end_time") }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </>)
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
                            control={<Checkbox
                                name="holiday_closure_event"
                                checked={formData.holiday_closure_event}
                                onChange={handleFormChange}
                            />}
                            label="Holiday/Closure Event" />
                        <CardActions sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                            <Button onClick={onCancel} variant="outlined" color="warning" size="normal">CANCEL</Button>
                            {editMode && <Button onClick={onDelete} variant="contained" color="error" size="normal">Delete</Button>}
                            <Button type="submit" variant="contained" color="primary" size="normal">SAVE</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
        </form>
    )
}