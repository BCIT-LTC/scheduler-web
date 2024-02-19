import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

const calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin],
  initialView: "dayGridWeek",
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "dayGridWeek,dayGridDay", // user can switch between the two
  },
});

export default calendar;
