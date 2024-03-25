import React, { useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme, Grid } from '@mui/material';

const MonthViewTable = ({ events }) => {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Ref to store the FullCalendar dot element
    const dotRef = useRef(null);

    const renderEventDot = () => {
        return (
            <Grid ref={dotRef} item className={`fc-daygrid-event-dot`} sx={{
                border: 'calc(var(--fc-daygrid-event-dot-width) / 2) solid #f00'
            }}/>
        );
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
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ fontSize: isMobile ? 'medium' : 'x-large' }} align='center'>Activity</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? 'medium' : 'x-large' }} align='center'>Time</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? 'medium' : 'x-large' }} align='center'>Room</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell className="event-dot-cell" sx={{ 
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: isMobile ? 'x-small' : 'medium',
                                ...(index === 0 && {
                                    /* The first event dot appears blue, all others will appear red to highlight overlap */
                                    '.fc-daygrid-event-dot': {
                                        border: 'calc(var(--fc-daygrid-event-dot-width) / 2) solid #3788d8'
                                    }
                                }), }} align='center'>
                                    {renderEventDot()}&nbsp;{event.title}
                                </TableCell>
                                <TableCell sx={{ fontSize: isMobile ? 'x-small' : 'medium' }} align='center'>
                                    {event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} - {event.end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </TableCell>
                                <TableCell sx={{ fontSize: isMobile ? 'x-small' : 'medium' }} align='center'>{event.extendedProps?.location}</TableCell>
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