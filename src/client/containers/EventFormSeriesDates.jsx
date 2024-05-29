import * as React from 'react';
import { useState, useEffect } from 'react';
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

const DaysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const EventFormSeriesDates = ({
  formData,
  handleFieldChange,
  handleTimeChange,
}) => {
  const [recurrenceDays, setRecurrenceDays] = useState(
    formData.recurrence_frequency_days
  );

  useEffect(() => {
    console.log('seriesformData', formData);
    setRecurrenceDays(formData.recurrence_frequency_days);
  }, [formData]);

  return (
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
                  endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} />,
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
                  endAdornment: <ScheduleIcon sx={{ opacity: '0.5' }} />,
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
              console.log('valuetype', typeof value);
              console.log('value', value);
              // const max = 52;
              // const min = 1;
              // if (value > max) value = max;
              // if (value < min) value = min;
              handleFieldChange('recurrence_frequency_weeks', value);
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
          {DaysOfWeek.map((day, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name={day}
                    checked={recurrenceDays.includes(index)}
                    onChange={(event) => {
                      setRecurrenceDays((prevRecurrenceDays) => {
                        let newRecurrenceDays;
                        if (event.target.checked) {
                          newRecurrenceDays = [...prevRecurrenceDays, index];
                        } else {
                          newRecurrenceDays = prevRecurrenceDays.filter(
                            (i) => i !== index
                          );
                        }
                        handleFieldChange(
                          'recurrence_frequency_days',
                          newRecurrenceDays
                        );
                        return newRecurrenceDays;
                      });
                    }}
                  />
                }
                label={day}
              ></FormControlLabel>
            );
          })}
        </div>
      </FormControl>
      <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
        <label>Range of recurrence</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="recurrence_start_date"
            label="Start Date (dd/mm/yyyy)"
            format="DD/MM/YYYY"
            value={formData.recurrence_start_date}
            // defaultValue={formData.recurrence_start_date}
            required
            disablePast={true}
            sx={{ flexGrow: 1, margin: '10px 0' }}
            slotProps={{
              textField: {
                variant: 'filled',
                style: {},
                InputProps: {
                  endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} />,
                },
              },
            }}
            onChange={(dateObject) => {
              handleTimeChange(dateObject, 'recurrence_start_date');
            }}
          />
          <DatePicker
            name="recurrence_end_date"
            label="End Date (dd/mm/yyyy)"
            format="DD/MM/YYYY"
            // defaultValue={formData.recurrence_end_date}
            value={formData.recurrence_end_date}
            required
            minDate={formData.recurrence_start_date}
            disablePast={true}
            slotProps={{
              textField: {
                variant: 'filled',
                style: {},
                InputProps: {
                  endAdornment: <CalendarTodayIcon sx={{ opacity: '0.5' }} />,
                },
              },
            }}
            onChange={(dateObject) => {
              handleTimeChange(dateObject, 'recurrence_end_date');
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default EventFormSeriesDates;
