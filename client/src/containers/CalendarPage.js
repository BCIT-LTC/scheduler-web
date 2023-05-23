import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PopUp from '../components/PopUp';
import CalendarDay from '../components/CalendarDay';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {GlobalContext} from '../context';
import {fetchCalendar} from '../utils/fetchFunctions';

/**
 *
 * @returns {JSX.Element} - Calendar Page
 */
export default function CalendarPage() {
  const Context = useContext(GlobalContext);
  const [month, setMonth] = useState(new Date());
  const [filteredSheetData, setFilteredSheetData] = useState([]);
  const matchedDates = useRef({});

  // Fetches calendar data based on the selected month
  async function fetchData() {
    const response = await fetchCalendar(
      month.getMonth() + 1,
      month.getFullYear()
    );
    setFilteredSheetData(response.results);
    matchedDates.current = {};
  }

  useEffect(() => {
    // Disables the calendar month button to prevent usage
    const calendarMonthLabel = document.querySelector(
      '.react-calendar__navigation button.react-calendar__navigation__label'
    );
    calendarMonthLabel.setAttribute('tabindex', -1);
    calendarMonthLabel.style.pointerEvents = 'none';
  }, []);

  useEffect(() => {
    fetchData();
  }, [month]);

  // Handles the change of active start date (month change)
  function handleActiveStartDateChange({activeStartDate}) {
    setMonth(activeStartDate);
  }

  return (
    <div className="App">
      <Calendar
        onActiveStartDateChange={handleActiveStartDateChange}
        value={month}
        onClickDay={(date, event) => {
          let matchingDays = [];
          if (filteredSheetData && filteredSheetData.length > 0) {
            matchingDays = filteredSheetData.filter((openLab) => {
              return date.getDate() === new Date(openLab.date).getUTCDate();
            });
            if (matchingDays.length > 0) {
              matchedDates.current = {
                ...matchedDates.current,
                [date.toISOString()]: matchingDays,
              };
            }
          }
          if (matchingDays) {
            Context.setSelectedDay(matchingDays);
          }
          Context.setPopup(!Context.state.popupOpen);
        }}
        showNeighboringMonth={false}
        tileClassName="tile"
        tileContent={({date, view}) => {
          let matchingDays = [];
          if (filteredSheetData && filteredSheetData.length > 0) {
            matchingDays = filteredSheetData.filter((openLab) => {
              return date.getDate() === new Date(openLab.date).getUTCDate();
            });
            if (matchingDays.length > 0) {
              matchedDates.current = {
                ...matchedDates.current,
                [date.toISOString()]: matchingDays,
              };
            }
          }
          return <CalendarDay date={date} data={matchingDays} />;
        }}
      />
      <PopUp />
    </div>
  );
}
