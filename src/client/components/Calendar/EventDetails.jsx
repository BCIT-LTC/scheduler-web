import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { GlobalContext } from '../../context/usercontext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const GridBox = styled(Box)({
    height: "1.5em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0",
    color: "#666666",
});

function EventDetails({ event, handleClose }) {

    const globalcontext = useContext(GlobalContext);
    const navigate = useNavigate();
    const handleClickEditEvent = (editSeries) => {
        navigate("/eventform", {state: {...event.extendedProps.unparsedEventData, editSeries: editSeries}});
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ position: "absolute", top: "0", left: "0", height: "100vh", width: "100%" }}
        >
            <Card sx={{ zIndex: "100", width: "70%", maxWidth: "600px", p: 2, boxShadow: 1, borderRadius: 2, position: "absolute", border: "3px #bd00ff solid" }}>
                <DisabledByDefaultIcon onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "grey", height: "30px", width: "30px" }} />
                <Box display="flex" justifyContent="center">
                    <h2>{event.title}</h2>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" columnGap={1} sx={{ border: "black dashed 1px", padding: "20px" }}>
                    <GridBox gridColumn="span 4">
                        <p>Date</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{dayjs(event.start).format('dddd, MMMM D, YYYY')}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Time</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{dayjs(event.start).format('h:mma')} - {dayjs(event.end).format('h:mma')}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Room</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{event.extendedProps?.location_id}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Facilitator</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{event.extendedProps?.facilitator}</p>
                    </GridBox>
                    <GridBox gridColumn="span 4">
                        <p>Description</p><p>:</p>
                    </GridBox>
                    <GridBox gridColumn="span 8">
                        <p>{event.extendedProps?.description}</p>
                    </GridBox>
                </Box>
                {globalcontext.user.is_logged_in && globalcontext.user.app_role === "admin" && <Box display="flex" justifyContent="center" padding="1em 0 0 0">
                    {event.extendedProps?.recurring && <Button variant="outlined" sx={{margin: "0 15px"}} onClick={() => {handleClickEditEvent(true)}}>Edit Series</Button>}
                    <Button variant="contained" color="primary" sx={{margin: "0 15px"}} onClick={() => {handleClickEditEvent(false)}}>Edit Event</Button>
                </Box>}
            </Card>
        </Box>

    );
}

export default EventDetails;
