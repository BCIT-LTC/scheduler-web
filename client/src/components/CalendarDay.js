import "./calendar-day.css"

export default function CalendarDay({ date, data }) {
  return (
    <div className="calendar-day">
      {data ? (
        <div>
          {data.map((d) => (
            <div>{d['start_time']}-{d['end_time']}</div>
          ))}
        </div>
      )
        : (
          <div className="no-lab" />
        )}
    </div>
  )
}
