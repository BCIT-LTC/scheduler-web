import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "../context/usercontext";
import CalendarComponent from "../components/Calendar/CalendarComponent";

/**
 *
 * @returns {JSX.Element} - Calendar Page
 */
const CalendarPage = () => {

  return (

    <React.Fragment>
      <CalendarComponent/>
    </React.Fragment>
    
  );
};

export default CalendarPage;
