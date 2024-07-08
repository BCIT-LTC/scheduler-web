import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CustomDatePicker from "../Shared/CustomDatePicker";
import CustomTimePicker from "../Shared/CustomTimePicker";
import CustomCheckbox from "../Shared/CustomCheckbox";
import CustomTextField from "../Shared/CustomTextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormLabel } from "@mui/material";


dayjs.extend(utc);

/**
 * Series Date Time Form
 * 
 * @returns {JSX.Element} - Series Date Time Form
 */

export default function SeriesDateTimeForm({ initialStartTime, initialEndTime, initialRecurrenceFrequency, initialRecurrenceDays, initialStartDate, initialEndDate }) {
    const DaysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const [startTime, setStartTime] = useState(dayjs(initialStartTime));
    const [endTime, setEndTime] = useState(dayjs(initialEndTime));
    const [recurrenceFrequency, setRecurrenceFrequency] = useState(initialRecurrenceFrequency);
    const [recurrenceDays, setRecurrenceDays] = useState(initialRecurrenceDays);
    const [startDate, setStartDate] = useState(dayjs(initialStartDate));
    const [endDate, setEndDate] = useState(dayjs(initialEndDate));


    return (
        <>
            <CustomTimePicker
                label="Event Start Time" name="start_time" required value={startTime} updateTime={setStartTime} />
            <CustomTimePicker label="Event End Time" name="end_time" required value={endTime} updateTime={setEndTime} />

            <FormControl sx={{ flexGrow: 1, margin: '10px 0' }}>
                <Grid container alignItems="center" spacing={0.5}>
                    <Grid item>
                        <Typography variant="body1">Recur every</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTextField
                            name="recurrence_frequency_weeks"
                            fieldType="number"
                            defaultState={recurrenceFrequency}
                            inputProps={{ min: 1 }}
                            updateState={setRecurrenceFrequency}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">week(s) on:</Typography>
                    </Grid>
                </Grid>

                {DaysOfWeek.map((day, index) => {
                    return (
                        <CustomCheckbox key={`day-${index}`}
                            label={day}
                            name={`day-${index}`}
                            value={index}
                            defaultChecked={recurrenceDays.includes(index)}
                            checked={recurrenceDays.includes(index)} />
                    );
                })}

            </FormControl>
            <FormControl>
                <FormLabel>Range of Recurrence</FormLabel>
                <CustomDatePicker label="Start Date" name="start_date" required value={startDate} updateDate={setStartDate} />
                <CustomDatePicker label="End Date" name="end_date" required value={endDate} updateDate={setEndDate} />
            </FormControl>

        </>

    );
}