import React from 'react';

const MonthViewTable = ({ events }) => {
    
    if (events.length > 0 ) { 
  return (
    <div>
     
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Time</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>{event.start.toLocaleTimeString()}</td>
              <td>{event.extendedProps?.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          }
          else {
              return (
                  null
              )
          }
};

export default MonthViewTable;