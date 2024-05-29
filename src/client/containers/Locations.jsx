//Usage: localhost:9000/locations
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import useGetLocations from '../hooks/locations/useGetLocations';
import LocationDetails from '../components/Locations/LocationDetails';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


// Location Page outline
const Locations = () => {
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    const locations = useGetLocations().data;  // Hook to recieve locations from the API
    const rows = locations ? locations.map((location) => ({
        id: location.location_id,
        location: location.room_location,
        created_at: location.created_at,
        created_by: location.created_by,
        last_modified: location.last_modified,
        modified_by: location.modified_by,
    })) : [];
    const columns = [
        { 
          field: 'location', 
          headerName: 'Room', 
          flex: 1,
          renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>{params.value}</div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => { 
                  navigate(`/editlocation`, {state: {location: params.row}})
                }}
              >
                EDIT
              </Button>
            </div>
          ),
        },
      ];
    
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
        <Card sx={{ flexGrow: 1, maxWidth: '500px', minWidth: '300px' }}>
            <Card  
            sx={{ margin: "16px" }}
            >
                <Typography sx={{ p: 1.5, fontSize: '1.5rem' }}>Room Management</Typography>
            </Card>
            <Button
                variant="contained"
                color="primary"
                size="normal"
                sx={{ margin: "16px"}}
                onClick={() => { navigate("/createlocation") }}
            >
                Create Room
            </Button>
            <DataGrid sx={{ width: '100%' }} 
              rows={rows} 
              columns={columns} 
              pageSize={5}>
            </DataGrid>
            {showLocationDetails ?
              <LocationDetails
                row={selectedLocation}
                handleClose={() => { setShowLocationDetails(false); }}
              /> : null}
            </Card>
        </Box>

    );
};
export default Locations;
