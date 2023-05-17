import "./calendar-day.css"

export default function CalendarDay({ date, data }) {

  return (
    <div className="calendar-day">
      {data ? (
        <div>
          <div>{data['start_time']}-{data['end_time']}</div>
        </div>
      )
        : (
          <div className="no-lab" />
        )}
    </div>
  )
}
