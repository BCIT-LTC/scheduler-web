import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

const calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin, listPlugin],
  initialView: "dayGrid3day",
  views: {
    dayGrid3Day: {
      type : "dayGrid",
      duration: { days: 3 },
      buttonText: "3 day",
    }
  },
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "dayGridMonth,dayGridWeek", // user can switch between the two
  },
});

export default calendar;
