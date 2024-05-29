import { Box, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import addLocation from '../../hooks/locations/useCreateLocation';
import { GlobalContext } from '../../context/usercontext';

function CreateLocation() {
    const globalcontext = useContext(GlobalContext);
    const navigate = useNavigate();
    const [roomLocation, setRoomLocation] = useState('');

    return(
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
            
            }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: "column"}}>
                    <Typography fontSize="20px" sx={{ p: 1.5 }}> Create New Room </Typography>
                    <TextField 
                        required 
                        label="Room Location"
                        value={roomLocation}
                        onChange={(e) => setRoomLocation(e.target.value)}
                    />
                    <Box display="flex" justifyContent="center" padding="1em 0 0 0">
                        <Button 
                        variant="outlined" 
                        sx={{ color:'red', borderColor: 'red', margin: '0 15px' }} 
                        onClick={() => { navigate("/locations")}}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" sx={{ margin: '0 15px' }}
                        onClick={() => {
                            addLocation({room_location: roomLocation, created_by: globalcontext.user.email});
                            navigate("/locations")
                        }}>
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateLocation;
