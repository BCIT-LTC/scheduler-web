import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

dayjs.extend(utc);

const CustomDisplayData = ({ data }) => {
    // Check if it's event or announcement by checking if the data has announcement_id
    const isAnnouncement = data.hasOwnProperty('announcement_id');

    if (isAnnouncement) {
        return (
            <Paper elevation={3} style={{ border: '1px solid red' }}>
                <Typography variant="p" align="center" color="textPrimary" paragraph style={{ fontWeight: 'bold' }}>Related Announcement</Typography>
                <Grid container spacing={1} style={{ padding: '0 0.7em' }}>
                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Title:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{data.title}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Description:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{data.description}</Typography></Grid>
                </Grid>
            </Paper>
        );
    } else {
        return (
            <Paper elevation={3} style={{ border: '1px solid red' }}>
                <Typography variant="p" align="center" color="textPrimary" paragraph style={{ fontWeight: 'bold' }}>Related Event</Typography>
                <Grid container spacing={1} style={{ padding: '0 0.7em' }}>
                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Event Name:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{data.summary}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Event Location:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{data.room_location}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Event Description:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{data.description}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Start Date:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{dayjs(data.start_time).format('MMMM D, YYYY')}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>Start Time:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{dayjs(data.start_time).format('h:mm A')}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>End Date:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{dayjs(data.end_time).format('MMMM D, YYYY')}</Typography></Grid>

                    <Grid item xs={12} sm={4}><Typography variant="body1"><b>End Time:</b></Typography></Grid>
                    <Grid item xs={12} sm={8} className="xs-to-left-padding"><Typography variant="body1">{dayjs(data.end_time).format('h:mm A')}</Typography></Grid>
                </Grid>
            </Paper>
        );
    }
};

export default CustomDisplayData;