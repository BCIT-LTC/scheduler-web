import React, { useState, useEffect, useContext, useRef } from 'react';
import CalendarComponent from "../components/Calendar/CalendarComponent";
import useGetEvents from "../hooks/events/useGetEvent";

const CalendarPage = () => {
  // get events from the API
  const events = useGetEvents();

  return (

    <React.Fragment>
      <CalendarComponent events={events} />
    </React.Fragment>

  );
};

export default CalendarPage;
