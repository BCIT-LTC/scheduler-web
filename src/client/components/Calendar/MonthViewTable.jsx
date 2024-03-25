import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, useMediaQuery, useTheme } from '@mui/material';

const MonthViewTable = ({ events }) => {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    if (events.length > 0 ) { 
        return (
            <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Activity</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Room</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event, index) => (
                            <TableRow key={index}>
    
                                <TableCell sx={{ fontSize: isMobile ? 'x-small' : 'medium' }}>{event.title}</TableCell>
                                <TableCell sx={{ fontSize: isMobile ? 'x-small' : 'medium' }}>
                                    {event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} - {event.end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </TableCell>
                                <TableCell sx={{ fontSize: isMobile ? 'x-small' : 'medium' }}>{event.extendedProps?.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return null;
    }
};

export default MonthViewTable;