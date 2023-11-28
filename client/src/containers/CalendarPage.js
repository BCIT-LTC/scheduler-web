import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "../context/usercontext";
import {
  Container,
  Paper
} from '@mui/material';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

let event = [
  {
    title: 'BCH237',
    start: '2023-11-23T10:30:00',
    end: '2023-11-24T11:30:00',
    extendedProps: {
      department: 'BioChemistry'
    },
    description: 'Lecture'
  }
  // more events ...
]


/**
 *
 * @returns {JSX.Element} - Calendar Page
 */
const CalendarPage = () => {

  let handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
  }

  let handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    console.log(selectInfo)

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          weekends={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={event}
          eventClick={handleEventClick}
          select={handleDateSelect}
        />
      </Paper>
    </Container>
  );
}

export default CalendarPage;

