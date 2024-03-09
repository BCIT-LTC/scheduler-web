import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "../context/usercontext";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import useGetEvents from "../hooks/events/useGetEvent";
import EventDetails from '../components/Calendar/EventDetailsMobile';
const dayjs = require('dayjs')

/**
 *
 * @returns {JSX.Element} - Calendar Page
 */

// parses the events to be used in the calendar
const parseEventsForCalendar = (events) => {
  return events.map((event) => {
    //recurring and non-recurring events are mapped differently
    if (event.series_title) {

      const recurringDays = event.recurrence_days.map((day) => {
        switch (day) {
          case 'Monday':
            return 1;
          case 'Tuesday':
            return 2;
          case 'Wednesday':
            return 3;
          case 'Thursday':
            return 4;
          case 'Friday':
            return 5;
          case 'Saturday':
            return 6;
          case 'Sunday':
            return 0;
          default:
            return;
        }
      });

      const startTime = dayjs(event.start_time).format('HH:mm:ss');
      const endTime = dayjs(event.end_time).format('HH:mm:ss');

      return {
        title: event.series_title,
        start: event.start_time,
        end: event.end_time,
        startTime: startTime,
        endTime: endTime,
        daysOfWeek: recurringDays,
        startRecur: event.start_date,
        endRecur: event.end_date,
        extendedProps: {
          location: event.location,
          description: event.description,
          facilitator: event.facilitator,
          announcement: event.announcement,
          status: event.status,
          series_id: event.series_id,
          created: event.created,
          last_modified: event.last_modified,
          recurring: true,
        }
      };
    }
    else {
      return {
        title: event.summary,
        start: event.start_time,
        end: event.end_time,
        extendedProps: {
          location: event.location,
          description: event.description,
          facilitator: event.facilitator,
          status: event.status,
          announcement: event.announcement,
          series_id: event.series_id,
          created: event.created,
          last_modified: event.last_modified,
          recurring: false,
        }
      };
    }
  });
};

const CalendarPage = () => {
  // get events from the API
  const events = useGetEvents();

  return (

    <React.Fragment>
      <CalendarComponent events={parseEventsForCalendar(events)} />
    </React.Fragment>

  );
};

export default CalendarPage;
