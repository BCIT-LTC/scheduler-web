import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Announcement details component
 * @param announcement - announcement object
 * @returns {JSX.Element}
 * @example <AnnouncementDetails announcement={announcement} />
 */
const AnnouncementDetails = ({ announcement, isAdmin }) => {
    const navigate = useNavigate();

    const displayDate = () => {
        let dateDisplay = '';
        if (announcement.created_at) {
            dateDisplay += `<strong>Posted on:</strong> ${dayjs(announcement.created_at).format('MMMM D, YYYY h:mm A')}`;
        }
        if (announcement.modified_at) {
            dateDisplay += ` | <strong>Last Updated:</strong> ${dayjs(announcement.modified_at).format('MMMM D, YYYY h:mm A')}`;
        }
        return dateDisplay;
    };

    return (

        <Card>
            <CardHeader
                title={announcement.title}
                subheader={<span dangerouslySetInnerHTML={{ __html: displayDate() }} />}
                titleTypographyProps={{ variant: "h6", color: "primary" }}
                subheaderTypographyProps={{ color: "secondary" }}
            />
            <CardContent>
                <Typography variant="body1" component="p">
                    {announcement.description}
                </Typography>
            </CardContent>

            {isAdmin && (
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button startIcon={<EditIcon />} aria-label="edit" variant="outlined"
                        onClick={() => {
                            navigate('/editannouncement', {
                                state: { mode: 'edit-announcement', ...announcement }
                            });
                        }}>
                        EDIT
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default AnnouncementDetails;