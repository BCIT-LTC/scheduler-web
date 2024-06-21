import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import useCheckIfPermitted from '../../hooks/users/useCheckIfPermitted';
import CustomDisplayData from '../Shared/CustomDisplayData';

function EventDetails({ event, handleClose, open }) {
    const navigate = useNavigate();
    const isAdmin = useCheckIfPermitted({ roles_to_check: ['admin'] });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition

            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Fade in={open}>
                <Card sx={{
                    zIndex: "100",
                    width: { xs: '90%', sm: '70%' }, // 90% width on mobile, 70% on tablet and larger
                    maxWidth: "600px",
                    p: 2,
                    boxShadow: 1,
                    borderRadius: 2,
                    position: "absolute",
                    border: "4px #bd00ff solid"
                }}>
                    <DisabledByDefaultIcon onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "grey", height: "30px", width: "30px" }} />
                    <CardContent>
                        <Box display="flex" justifyContent="center">
                            <h2>{event.title}</h2>
                        </Box>
                        <Box display="grid" gridTemplateColumns="auto min-content auto" gap={2} sx={{ padding: "1em" }}>
                            <Box component="span">Date</Box><Box component="span">:</Box>
                            <Box component="span">{dayjs(event.start).format('dddd, MMMM D, YYYY')}</Box>
                            <Box component="span">Time</Box><Box component="span">:</Box>
                            <Box component="span">{dayjs(event.start).format('h:mma')} - {dayjs(event.end).format('h:mma')}</Box>
                            <Box component="span">Room</Box><Box component="span">:</Box>
                            <Box component="span">{event.extendedProps?.room_location}</Box>
                            <Box component="span">Facilitator</Box><Box component="span">:</Box>
                            <Box component="span">{event.extendedProps?.facilitator}</Box>
                            <Box component="span">Description</Box><Box component="span">:</Box>
                            <Box component="span">{event.extendedProps?.description}</Box>
                        </Box>
                        {
                            event.extendedProps?.unparsedEventData?.event_announcement &&
                            <CustomDisplayData data={event.extendedProps.unparsedEventData.event_announcement} />
                        }
                    </CardContent>
                    {
                        isAdmin &&
                        <CardActions sx={{ display: 'flex', justifyContent: 'center', padding: '1em 0 0 0' }}>
                            {event.extendedProps?.series_id &&
                                <Button variant="outlined" sx={{ margin: "0 15px" }}
                                    onClick={() => {
                                        navigate('/editseries', {
                                            state: { mode: 'edit-series', ...event.extendedProps.unparsedEventData.series }
                                        });
                                    }}>
                                    Edit Series
                                </Button>
                            }
                            <Button variant="contained" color="primary" sx={{ margin: "0 15px" }}
                                onClick={() => {
                                    navigate('/editevent', {
                                        state: { mode: 'edit-event', ...event.extendedProps.unparsedEventData }
                                    });
                                }}>
                                Edit Event
                            </Button>
                            {
                                event.extendedProps?.unparsedEventData?.event_announcement == null &&
                                <Button variant="outlined" color="primary" sx={{ margin: "0 15px" }}
                                    onClick={() => {
                                        navigate('/createannouncement', {
                                            state: { mode: 'create-event-announcement', event: event.extendedProps.unparsedEventData }
                                        });
                                    }}>
                                    Add Announcement
                                </Button>
                            }
                        </CardActions>
                    }
                </Card>
            </Fade>
        </Modal>
    );
}

export default EventDetails;