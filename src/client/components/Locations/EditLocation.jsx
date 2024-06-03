import { Box, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { API_BASE_URL } from '../../../constants';
import { GlobalContext } from '../../context/usercontext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const url = `${API_BASE_URL}/locations`;

const deleteLocation = async (id) => {
    console.log("Inside deleteLocation")
    console.log(id);
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error('API error: ', error);
        });
}

const modifyLocation = async (id, payload) => {
    console.log(payload);
    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify(payload),
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error('API error: ', error);
        });
}


function EditLocation() {
    const globalcontext = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const locationData = location.state.location;
    const [roomLocation, setRoomLocation] = useState(locationData.location);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return(
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card sx={{
                width: isMobile ? '100%' : '50%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
            
            }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: "column"}}>
                    <Typography fontSize="20px" sx={{ p: 1.5 }}> Edit Room </Typography>
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
                        onClick={() => { navigate("/locations") }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" sx={{ backgroundColor: 'red', margin: '0 15px' }}
                        onClick={() => {
                            deleteLocation(locationData.id);
                            navigate("/locations")
                        }}>
                            Delete
                        </Button>
                        <Button variant="contained" color="primary" sx={{ margin: '0 15px' }}
                        onClick={() => { 
                            modifyLocation(locationData.id, { room_location: roomLocation, modified_by: globalcontext.user.email })
                            navigate("/locations")
                        }}>
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};
export default EditLocation;
