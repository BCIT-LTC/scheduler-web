import CalendarComponent from "../components/Calendar/CalendarComponent";
import useGetEvents from "../hooks/events/useGetEvent";

const CalendarPage = () => {
  // get events from the API
  const events = useGetEvents();

  return (
    <CalendarComponent events={events} />
  );
};

export default CalendarPage;
