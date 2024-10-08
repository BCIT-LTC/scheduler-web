// React imports
import { useState } from 'react';

// FullCalendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

// Material-UI imports
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

// Internal imports
import EventDetails from './EventDetails';
import MonthViewTable from './MonthViewTable';



function CalendarComponent(events) {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Holds state of whether to show the month view table below the calendar in month view
  const [showMonthViewTable, setShowMonthViewTable] = useState(false);
  const [monthViewTableEvents, setMonthViewTableEvents] = useState(null);

  // Holds state of the previously selected date element for unhighlighting in the month view
  const [previousDayEl, setPreviousDayEl] = useState(null);

  // Holds state of whether the calendar is in month view to hide event time and title
  const [monthView, setMonthView] = useState(false);

  let handleEventClick = (e) => {
    setShowEventDetails(true);
    setSelectedEvent(e.event);
  };

  let handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // console.log(selectInfo);

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

  //let previousDayEl = null;

  let handleDateClick = (clickInfo) => {

    if (clickInfo.view.type === 'dayGridMonth') {

      setShowMonthViewTable(true);

      let calendarApi = clickInfo.view.calendar;

      // Store reference to the currently clicked date element
      let newDayEl = clickInfo.dayEl;


      // Reset background color of previously clicked date
      if (previousDayEl !== null && previousDayEl !== newDayEl) {
        previousDayEl.style.borderColor = '#ddd';
        previousDayEl.style.borderWidth = '1px';
      }

      // Change background color of the newly clicked date
      newDayEl.style.borderColor = '#00f';
      newDayEl.style.borderWidth = '1px';


      setPreviousDayEl(newDayEl);

      // Get the clicked date
      let clickedDate = new Date(clickInfo.date);
      clickedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

      // Retrieve events for the clicked date
      let events = calendarApi.getEvents();
      let eventsOnClickedDate = [];

      for (let i = 0; i < events.length; i++) {
        let eventStart = events[i].start.toDateString();

        if (eventStart === clickedDate.toDateString()) {
          eventsOnClickedDate.push(events[i]);
        }
      }
      setMonthViewTableEvents(eventsOnClickedDate);
    }
  };

  let handleViewUnmount = (view) => {

    if (view.view.type === 'dayGridMonth') {
      setMonthView(false);
      setShowMonthViewTable(false);

    }
  };

  let handleViewMount = (view) => {

    if (view.view.type === 'dayGridMonth') {
      setMonthView(true);
    }
  };

  const theme = useTheme();

  // calendar layout based on screen size (isMobile = true for screen widths below 600px)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function renderEventContent(eventInfo) {
    let event = eventInfo.event.extendedProps;

    if (eventInfo.view.type === 'timeGridWeek' || eventInfo.view.type === 'dayGridThreeDays') {
      return (
        <>
          {eventInfo.timeText} <br /> {eventInfo.event.title} <br /> Room: {event.room_location}
        </>
      );
    } else if (eventInfo.view.type === 'listWeek') {
      return <><div className="fc-listWeek-event-dot wtf"></div>{eventInfo.event.title} <br /> Room: {event.room_location} {event.description ? <><br /> {event.description}</> : null}</>;
    } else {
      if (isMobile) {
        return (
          <>
            <div className="fc-daygrid-event-dot"></div>
          </>
        );
      } else {
        return (
          <>
            <div className="fc-daygrid-event-dot"></div> {eventInfo.timeText} {eventInfo.event.title}
          </>
        );
      }
    }

  }

  return (

    <Container maxWidth="lg" sx={{ mt: 3, padding: '2em 5px 0 5px' }}>
      <Grid item xs={12}
        sx={{
          // change cursor to pointer on list style events
          '.fc-list-event': {
            cursor: 'pointer'
          },

          '.fc-toolbar-chunk': {
            display: 'flex'
          },
          '.fc table': {
            borderCollapse: 'separate',
            borderSpacing: '0 !important',

          },

          // Center the date in the cell on month view
          '.fc-daygrid-day-top': {
            justifyContent: 'center'
          },
          '.fc-daygrid-day-events > :nth-of-type(n+2) .fc-daygrid-event-dot': {
            border: 'calc(var(--fc-daygrid-event-dot-width) / 2) solid #f00',
          },
          '.fc-event, .fc-event-time': {
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          },

          // Align event time and title in the same line
          '.fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start': {
            alignItems: 'baseline'
          },
          '.fc-timegrid-col-events': {
            cursor: 'pointer'
          },

          // Overlapping events in week view appear red
          '.fc-timegrid-col-events > :nth-of-type(n+2) .fc-event-main': {
            backgroundColor: '#f00',

          },

          // Sibling based selector for overlapping events on a day in list view to appear red
          '.fc-list-day + .fc-event.fc-event-start.fc-event-end.fc-event-past.fc-list-event + .fc-event.fc-event-start.fc-event-end.fc-event-past.fc-list-event .fc-list-event-time + .fc-list-event-graphic .fc-list-event-dot': {
            border: 'calc(var(--fc-daygrid-event-dot-width) / 2) solid #f00',

            // red event dot dimensions need adjustments to match the blue dots
            width: '1.33px',
            height: '1.33px',
            backgroundColor: '#f00',
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
            '.fc-header-toolbar> :nth-of-type(1)': {
              order: '0',
              flex: '0 0 calc(30% - 10px)',
            },
            '.fc-header-toolbar> :nth-of-type(2)': {
              order: '1',
              fontSize: 'x-small',
              paddingTop: "4%",
              display: 'flex',
              justifyContent: 'space-between'
            },
            '.fc-header-toolbar> :nth-of-type(3)': {
              order: '0',
              flex: '0 0 calc(50% - 10px)'
            },
            '.fc-col-header-cell-cushion': {
              fontSize: 'small'
            },
            '.fc-media-screen.fc-direction-ltr.fc-theme-standard': {

              // height: '100vh',
              // maxHeight: '650px'
            },

            ...(monthView && {
              '.fc-event-time, .fc-event-title': {
                display: 'none'
              },
              // Center the event dots in the cell on month view in mobile
              '.fc-daygrid-day-events': {
                display: 'flex',
                justifyContent: 'center',
              },
              // Hide the bottom border of the day cell in month view in mobile
              '.fc-daygrid-day-bottom': {
                display: 'none'
              },
            })
          })
        }}
      >


        <FullCalendar
          height="auto"
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          views={{
            dayGridThreeDays: {
              type: "timeGrid",
              duration: { days: 3 },
              buttonText: "day",
            },
          }}
          headerToolbar={{
            left: 'today',
            center: 'prev title next',
            right: 'dayGridMonth,timeGridWeek,dayGridThreeDays,listWeek'
          }}

          initialView="timeGridWeek"
          weekends={true}
          // editable={true}
          // selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          select={handleDateSelect}
          dateClick={handleDateClick}
          nowIndicator={true}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          allDaySlot={false}
          viewDidMount={handleViewMount}
          viewWillUnmount={handleViewUnmount}
        />
        {showEventDetails ?
          <EventDetails
            event={selectedEvent}
            handleClose={() => { setShowEventDetails(false); }}
            open={showEventDetails}
          /> : null}

      </Grid>

      {showMonthViewTable && monthViewTableEvents.length > 0 ? (<>


        <MonthViewTable events={monthViewTableEvents} />


      </>) : null}
    </Container>
  );
};

export default CalendarComponent;
