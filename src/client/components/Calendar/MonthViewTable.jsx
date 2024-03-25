import React, { useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, useMediaQuery, useTheme } from '@mui/material';

const MonthViewTable = ({ events }) => {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Ref to store the FullCalendar dot element
    const dotRef = useRef(null);

    // Function to render the event dot within TableCell
    const renderEventDot = () => {
        return <div ref={dotRef} className="fc-daygrid-event-dot" />;
    };

    // Effect to move the dot element to the correct TableCell
    useEffect(() => {
        if (dotRef.current) {
            const tableCells = document.querySelectorAll('.event-dot-cell');
            tableCells.forEach(cell => {
                if (cell.children.length === 0) { // Check if the cell is empty
                    cell.appendChild(dotRef.current.cloneNode(true));
                }
            });
        }
    }, [events]);

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
                                <TableCell className="event-dot-cell" sx={{ fontSize: isMobile ? 'x-small' : 'medium' }}>
                                    {renderEventDot()}
                                    {event.title}
                                </TableCell>
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