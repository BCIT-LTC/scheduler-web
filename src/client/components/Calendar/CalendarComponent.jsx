import React, { useState } from 'react';
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {
  Container,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EventDetails from './EventDetails';


function CalendarComponent(events) {

  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  let handleEventClick = (e) => {
    setShowEventDetails(true);
    setSelectedEvent(e.event);
  };

  let handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    console.log(selectInfo);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  };

  let previousDayEl = null;

  let handleDateClick = (clickInfo) => {
    let calendarApi = clickInfo.view.calendar;

    // Reset background color of previously clicked date
    if (previousDayEl) {
        previousDayEl.style.borderColor = '#ddd';
        previousDayEl.style.borderWidth = '1px';
        //previousDayEl.style.boxShadow = '';

        previousDayEl.style.outline = ''; // Reset outline
    }

    // Change background color of the newly clicked date
    //clickInfo.dayEl.style.borderStyle = 'solid';
    clickInfo.dayEl.style.borderColor = 'blue';
    clickInfo.dayEl.style.borderWidth = '5px';
   // clickInfo.dayE1.style.boxShadow = '0 0 0 5px red';

    //clickInfo.dayE1.style.outline = '2px solid red';


    // Store reference to the currently clicked date element
    previousDayEl = clickInfo.dayEl;

    console.log(clickInfo);
  }

  const theme = useTheme();

  // calendar layout based on screen size (isMobile = true for screen widths below 600px)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>

        <Grid container spacing={isMobile ? 2 : 4}>

          <Grid item xs={12}
            sx={{

              '.fc-toolbar-chunk': {
                display: 'flex'
              },
              '.fc table': {
                borderCollapse: 'separate',
                borderSpacing: '0 !important'
              },
              

              ...(isMobile && {
                '.fc-header-toolbar': {
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                },
                '.fc-header-toolbar>div': {
                  flex: '0 0 calc(100% - 10px)',
                  textAlign: 'center'
                },
                '.fc-header-toolbar> :nth-child(1)': {
                  order: '0',
                  flex: '0 0 calc(30% - 10px)',
                },
                '.fc-header-toolbar> :nth-child(2)': {
                  order: '1',
                  fontSize: 'x-small',
                  paddingTop: "4%",
                  display: 'flex',
                  justifyContent: 'space-between'
                },
                '.fc-header-toolbar> :nth-child(3)': {
                  order: '0',
                  flex: '0 0 calc(50% - 10px)'
                },
                '.fc-col-header-cell-cushion': {
                  fontSize: 'small'
                },
                '.fc-media-screen.fc-direction-ltr.fc-theme-standard': {

                  height: '100vh',
                  maxHeight: '650px'

                }

              })
            }}
          >

            {isMobile ? (
              <>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: 'today',
                    center: 'prev title next',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                  }}

                  initialView="timeGridWeek"
                  weekends={true}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  events={events}
                  eventClick={handleEventClick}
                  select={handleDateSelect}
                  dateClick={handleDateClick}
                  nowIndicator={true}
                  slotMinTime="08:00:00"
                  slotMaxTime="17:00:00"
                />
                {showEventDetails ?
                  <EventDetails
                    event={selectedEvent}
                    isMobile={isMobile}
                    handleClose={() => { setShowEventDetails(false) }}
                  /> : null}
              </>

            ) : (

              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'today prev next',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                initialView="timeGridWeek"
                weekends={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
                eventClick={handleEventClick}
                select={handleDateSelect}
                dateClick={handleDateClick}
                nowIndicator={true}
                slotMinTime="08:00:00"
                slotMaxTime="17:00:00"
              />
            )
            }
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
};

export default CalendarComponent;
