import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CustomDatePicker = (props) => {
    const [currentDate, setCurrentDate] = useState(props.value);

    const updateCurrentDate = useCallback((date) => {
        setCurrentDate(date);
    }, []);

    useEffect(() => {
        props.updateDate(props.value);
    }, [props.value, currentDate, props.updateDate]);

    const minDate = useMemo(() => dayjs().startOf('month'), []);
    const endAdornment = useMemo(() => <CalendarMonthOutlinedIcon sx={{ opacity: "0.5" }} />, []);

    return (
        <Stack direction="row" spacing={0.5} className='custom-form custom-date-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    required
                    disablePast
                    label={props.label}
                    name={props.name}
                    format="dddd, MMMM D, YYYY"
                    value={currentDate}
                    minDate={minDate}
                    onChange={updateCurrentDate}
                    sx={{ flexGrow: 1, margin: "10px 0" }}
                    slotProps={{
                        textField: {
                            variant: "outlined",
                            InputProps: {
                                endAdornment: endAdornment,
                            },
                        },
                    }}
                />
            </LocalizationProvider>
        </Stack>
    );
};

export default memo(CustomDatePicker);