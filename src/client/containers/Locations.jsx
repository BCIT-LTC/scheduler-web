import React from 'react';
import Container from '@mui/material/Container';

import RoomManagementPage from '../components/Locations/RoomManagementPage';

// Location Page outline
const Locations = () => {

    return (
        <Container maxWidth="sm">
            <RoomManagementPage/>
        </Container>
    );
}

export default Locations;