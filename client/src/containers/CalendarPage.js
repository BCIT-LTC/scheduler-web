import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "../context/usercontext";
import {
  Container,
  Paper
} from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import CalendarComponent from "../components/Calendar/CalendarComponent";

let event = [
  {
    title: 'BCH237',
    start: '2024-03-04T10:30:00',
    end: '2024-03-05T11:30:00',
    extendedProps: {
      department: 'BioChemistry'
    },
    description: 'Lecture'
  }
];


/**
 *
 * @returns {JSX.Element} - Calendar Page
 */
const CalendarPage = () => {

  // let handleEventClick = (clickInfo) => {
  //   console.log(clickInfo.event);
  // };

  // let handleDateSelect = (selectInfo) => {
  //   // let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   console.log(selectInfo);

  //   // if (title) {
  //   //   calendarApi.addEvent({
  //   //     id: createEventId(),
  //   //     title,
  //   //     start: selectInfo.startStr,
  //   //     end: selectInfo.endStr,
  //   //     allDay: selectInfo.allDay
  //   //   })
  //   // }
  // };


  return (
    // <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //   <Paper elevation={3} sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
    //     <FullCalendar
    //       plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
    //       headerToolbar={{
    //         left: 'prev,next today',
    //         center: 'title',
    //         right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek'
    //       }}
    //       initialView="timeGridWeek"
    //       weekends={true}
    //       editable={true}
    //       selectable={true}
    //       selectMirror={true}
    //       dayMaxEvents={true}
    //       events={event}
    //       eventClick={handleEventClick}
    //       select={handleDateSelect}
    //       nowIndicator={true}
    //       slotMinTime="08:00:00"
    //       slotMaxTime="17:00:00"
    //     />
    //   </Paper>
    // </Container>

    <React.Fragment>
      <CalendarComponent/>
    </React.Fragment>
  );
};

export default CalendarPage;
