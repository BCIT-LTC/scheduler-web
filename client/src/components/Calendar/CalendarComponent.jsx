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
  useTheme
} from '@mui/material';

// const Calendar = new Calendar(calendarEl, {
//   // plugins: [dayGridPlugin],
//   // initialView: "dayGridWeek",
//   // headerToolbar: {
//   //   left: "prev,next",
//   //   center: "title",
//   //   right: "dayGridWeek,dayGridDay", // user can switch between the two
//   // },


//   plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
//   headerToolbar: {
//     left: 'prev,next today',
//     center: 'title',
//     right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek'
//   },
//   initialView: "timeGridWeek",
//   weekends: 'true',
//   editable: 'true',
//   selectable: 'true',
//   selectMirror: 'true',
//   dayMaxEvents: 'true',
//   //events={event}
//   eventClick: handleEventClick,
//   select: handleDateSelect,
//   nowIndicator: 'true',
//   slotMinTime: "08:00:00",
//   slotMaxTime: "17:00:00"
  

// });

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

function CalendarComponent () {
  let handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return(

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2, boxShadow: 1, borderRadius: 2 }}>
      
      <Grid container spacing={isMobile ? 2 : 3}>
      
      <Grid item xs={12}>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'today',
          center: 'prev title next',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        sx={{
          '& .fc-toolbar.fc-header-toolbar': {
            // Apply styles directly to the center portion of the headerToolbar
            // For example:
            backgroundColor: 'lightblue',
            borderRadius: '5px',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
          }
        }}
          
        initialView="timeGridWeek"
        weekends={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={event}
        eventClick={handleEventClick}
        select={handleDateSelect}
        nowIndicator={true}
        slotMinTime="08:00:00"
        slotMaxTime="17:00:00"
      />

</Grid>

      </Grid>
      

      </Paper>
    </Container>
    
  )
  

};


export default CalendarComponent;
