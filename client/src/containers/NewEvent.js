import * as React from 'react';
import { useState, useContext } from "react"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
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

const dayjs = require('dayjs')

/**
 * New Event Page
 * 
 * @returns {JSX.Element} - New Event Page
 */
export default function NewEvent(
    {
        roomOptions = ["SE12-316", "SE12-200", "NW4-328"],
        defaultValues = {
            event_name: "",
            room: "",
            recurring_event: false,
            start_time: dayjs(), //default start datetime is now
            end_time: dayjs(), //default end datetime is now
            recurrence_interval: 1,
            recurring_days: [false, false, false, false, false],
            facilitator: "",
            description: "",
            holiday_closure_event: false
        }
    }
) {

    const [formData, setFormData] = useState({
        event_name: defaultValues.event_name,
        room: defaultValues.room,
        recurring_event: defaultValues.recurring_event,
        start_time: defaultValues.start_time,
        end_time: defaultValues.end_time,
        recurrence_interval: defaultValues.recurrence_interval,
        recurring_days: defaultValues.recurring_days,
        facilitator: defaultValues.facilitator,
        description: defaultValues.description,
        holiday_closure_event: defaultValues.holiday_closure_event
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

    const handleStartDateChange = (e) => {
        setFormData(
            {
                ...formData,
                start_time: formData.start_time.set('date', e.date())
            })
    }

    const handleStartTimeChange = (e) => {
        setFormData(
            {
                ...formData,
                start_time: formData.start_time
                    .set('hour', e.hour())
                    .set('minute', e.minute())
                    .set('second', 0)
            })
    }

    const handleEndDateChange = (e) => {
        setFormData(
            {
                ...formData,
                end_time: formData.end_time.set('date', e.date())
            })
    }

    const handleEndTimeChange = (e) => {
        setFormData(
            {
                ...formData,
                end_time: formData.end_time
                    .set('hour', e.hour())
                    .set('minute', e.minute())
                    .set('second', 0)
            })
    }

    const handleRecurringDaysChange = (e) => {
        const dayNum = parseInt(e.target.name[e.target.name.length - 1]);
        const newRecurringDays = formData.recurring_days;
        newRecurringDays[dayNum] = e.target.checked;
        setFormData({ ...formData, recurring_days: newRecurringDays });
    }

    //TODO: Implement the submit function
    const onSubmit = (e) => { 
        e.preventDefault(); 
        console.log("formData: ", formData) 
    }

    //TODO: Implement the cancel function
    const onCancel = (e) => { console.log("formData: ", formData) }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Card sx={{ flexGrow: 1, maxWidth: '500px', minWidth: '300px' }} >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
                        <label style={{ fontSize: "1.2em" }}>New Event</label>
                        <TextField
                            label="Event Name"
                            variant="outlined"
                            required
                            name="event_name"
                            inputProps={{ maxLength: 50 }}
                            onChange={handleFormChange}
                            sx={{ flexGrow: 1, margin: '10px 0' }}
                        />
                        <TextField
                            select
                            label="Room"
                            required
                            name="room"
                            defaultValue=""
                            onChange={(e) => { setFormData({ ...formData, room: e.target.value }) }}
                            sx={{ flexGrow: 1, margin: '10px 0' }}
                        >
                            {roomOptions.map((room, index) => {
                                return <MenuItem key={index} value={room}>{room}</MenuItem>;
                            })}
                        </TextField>

                        <FormControlLabel control={<Checkbox
                            name="recurring_event"
                            checked={formData.recurring_event}
                            onChange={handleFormChange}
                        />}
                            label="Recurring Event">
                        </FormControlLabel>
                        <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}
                        >
                            <label>Start Date*</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name="start_date"
                                    label="Date (dd/mm/yyyy)"
                                    format="DD/MM/YYYY"
                                    defaultValue={formData.start_time}
                                    required
                                    sx={{ flexGrow: 1, margin: '10px 0' }}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            style: {},
                                            InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                        },
                                    }}
                                    onChange={handleStartDateChange}
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
                                    onChange={handleStartTimeChange}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        {
                            //if recurring event is checked, show the recurring event options
                            formData.recurring_event ?
                                <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}
                                >
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
                                            name="recurring_days_0"
                                            checked={formData.recurring_days[0]}
                                            onChange={handleRecurringDaysChange}
                                        />}
                                            label="Monday">
                                        </FormControlLabel>
                                        <FormControlLabel control={<Checkbox
                                            name="recurring_days_1"
                                            checked={formData.recurring_days[1]}
                                            onChange={handleRecurringDaysChange}
                                        />}
                                            label="Tuesday">
                                        </FormControlLabel>
                                        <FormControlLabel control={<Checkbox
                                            name="recurring_days_2"
                                            checked={formData.recurring_days[2]}
                                            onChange={handleRecurringDaysChange}
                                        />}
                                            label="Wednesday">
                                        </FormControlLabel>
                                        <FormControlLabel control={<Checkbox
                                            name="recurring_days_3"
                                            checked={formData.recurring_days[3]}
                                            onChange={handleRecurringDaysChange}
                                        />}
                                            label="Thursday">
                                        </FormControlLabel>
                                        <FormControlLabel control={<Checkbox
                                            name="recurring_days_4"
                                            checked={formData.recurring_days[4]}
                                            onChange={handleRecurringDaysChange}
                                        />}
                                            label="Friday">
                                        </FormControlLabel>
                                    </div>

                                </FormControl> : <></>
                        }
                        <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}
                        >
                            <label>End Date*</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date (dd/mm/yyyy)"
                                    format="DD/MM/YYYY"
                                    required
                                    sx={{ flexGrow: 1, margin: '10px 0' }}
                                    defaultValue={formData.end_time}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            style: {},
                                            InputProps: { endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} /> }
                                        },
                                    }}
                                    onChange={handleEndDateChange}
                                />
                                <MobileTimePicker
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
                                    onChange={handleEndTimeChange}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <TextField
                            name="facilitator"
                            label="Facilitator"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
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
                            <Button type="submit" variant="contained" color="primary" size="normal">SAVE</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </form>
        </ >
    )
}