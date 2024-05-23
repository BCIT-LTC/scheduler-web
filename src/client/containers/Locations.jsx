//Usage: localhost:9000/locations
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import useGetLocations from '../hooks/locations/useGetLocations';
import LocationDetails from './LocationDetails';

// Location Page outline
const Locations = () => {
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

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
        { field: 'location', headerName: 'Location', flex: 1 },
    ];

    
    return (
        <Box sx={{ width: '100%'}}>
            <Box>
                <h1>Locations</h1>
            </Box>
            <Button
                variant="outlined"
                style={{ color: 'green' }}
                size="normal"
            >
                Create
            </Button>
            <DataGrid sx={{ width: '100%' }} 
              rows={rows} 
              columns={columns} 
              pageSize={5} 
              onCellClick={(params) => {
                console.log(`selected ${params.row}`)
                setShowLocationDetails(true)
                setSelectedLocation(params.row)
              }}
            />
            {showLocationDetails ?
              <LocationDetails
                row={selectedLocation}
                handleClose={() => { setShowLocationDetails(false); }}
              /> : null}
        </Box>

    );
};
export default Locations;
