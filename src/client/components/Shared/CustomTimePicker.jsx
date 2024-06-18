import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CustomTimePicker = (props) => {
    const [currentTime, setCurrentTime] = useState(props.value);

    const updateTime = useCallback((time) => {
        setCurrentTime(dayjs(time));
    }, []);

    useEffect(() => {
        props.updateTime(currentTime);
    }, [currentTime, props.updateTime]);

    const endAdornment = useMemo(() => <AccessTimeIcon sx={{ opacity: "0.5" }} />, []);

    return (
        <Stack direction="row" spacing={0.5} className='custom-form custom-time-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                    required
                    label={props.label}
                    name={props.name}
                    value={currentTime}
                    onChange={updateTime}
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

export default React.memo(CustomTimePicker);