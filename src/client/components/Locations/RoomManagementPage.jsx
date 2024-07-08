import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import EditIcon from '@mui/icons-material/Edit';

import useCRUD from '../../hooks/useCRUD';


const RoomManagementPage = () => {
    const navigate = useNavigate();

    const {
        performAction: getLocations,
        isSuccessful: isGetLocationsSuccessful,
        isLoading: isGetLocationsLoading,
        responseData: LocationsData
    } = useCRUD();

    useEffect(() => {
        getLocations('get', 'locations');
    }, []);

    const ListOfRooms = ({ data }) => {
        if (!data) {
            return null;
        }
        const items = Array.from(data).map((item, index) => (
            <ListItem key={index}
                secondaryAction={
                    <IconButton edge="end" aria-label="edit"
                        onClick={() => {
                            navigate(`/editlocation`, { state: { mode: 'edit-location', ...item } });
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                }
            >
                <ListItemText
                    primary={item.room_location}
                    secondary={"Updated: " + (() => {
                        let modified_date = new Date(item.last_modified);
                        return modified_date.toDateString();
                    })()
                    }
                />
            </ListItem>
        ));
        return <List dense={false}>
            {items}
        </List>;
    };

    return (
        <Box component="div"
            sx={{
                display: 'flex', flexDirection: 'column',
                gap: 2,
                padding: '1em',
                justifyContent: 'center'
            }}>
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                Room Management
            </Typography>
            <Typography variant="p" align="center" color="textSecondary" paragraph>
                Add, Edit or delete rooms
            </Typography>

            <Stack direction="row" justifyContent="center">
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    color="primary"
                    size="normal"
                    onClick={() => { navigate("/createlocation"); }}
                >
                    Create Room
                </Button>

            </Stack>
            {isGetLocationsLoading ?
                <>
                    <Stack spacing={1}>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                    </Stack>
                </>
                :
                isGetLocationsSuccessful ?
                    <ListOfRooms data={LocationsData} />
                    :
                    <Typography variant="p" align="center" color="textSecondary" paragraph>
                        Error fetching data
                    </Typography>
            }
        </Box>
    );
};

export default RoomManagementPage;