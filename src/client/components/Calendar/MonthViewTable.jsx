import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MonthViewTable = ({ events }) => {
    
    if (events.length > 0 ) { 
        return (
            <TableContainer>
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
                                <TableCell sx={{ fontSize: 'x-small' }}>{event.title}</TableCell>
                                <TableCell sx={{ fontSize: 'x-small' }}>
                                    {event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} - {event.end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </TableCell>
                                <TableCell sx={{ fontSize: 'x-small' }}>{event.extendedProps?.location}</TableCell>
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