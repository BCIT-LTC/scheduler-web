import './formrow.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

/**
 * represents each form in FormContainer
 */
export default function FormRow({
  formNumber,
  forms,
  setForms,
  errorState = false,
  errorType,
}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  /**
   * keep track of change in each form input
   */
  function handleUpdateForm(field, value) {
    const newForms = [...forms];
    newForms[formNumber] = { ...newForms[formNumber], [field]: value };
    setForms(newForms);
  }

  /**
   * onChange handler for the date picker library
   */
  const onChange = (dates) => {
    if (dates.length !== 2) return;
    const [start, end] = dates; // Destructure the array to get the start and end date
    const newForms = [...forms];
    newForms[formNumber] = { ...newForms[formNumber], start_date: start, end_date: end };
    setForms(newForms);
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="calendarForm">
      <form
        className={`calendarInputs data-form ${errorState ? 'data-form--error' : 'calendarInputs'
          }`}
      >
        <div className="data-form__inputs">
          <div
            className={
              (errorType.includes('Same Date') && 'data-form__inputs--error') ||
              ''
            }
          >
            <label className="calendarLabel" htmlFor="date">Date: </label>
            {(forms[formNumber]?.date) ?
              <input className="calendarInput"
                name="date"
                type="date"
                readOnlyeach form input={new Date(forms[formNumber].date).toISOString().split('T')[0]}
                onChange={(e) => handleUpdateForm('date', e.target.value)}
              />
              :
              <div>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onChange}
                />
              </div>

            }
          </div>
          <div>
            <label className="calendarLabel" htmlFor="start_time">Start Time: </label>
            <input className="calendarInput"
              name="start_time"
              type="time"
              value={forms[formNumber]?.['start_time']}
              onChange={(e) => handleUpdateForm('start_time', e.target.value)}
            />
          </div>
          <div>
            <label className="calendarLabel" htmlFor="end_time">End Time: </label>
            <input className="calendarInput"
              name="end_time"
              type="time"
              value={forms[formNumber]?.['end_time']}
              onChange={(e) => handleUpdateForm('end_time', e.target.value)}
            />
          </div>
          <div
            className={
              (errorType.includes('No Facilitator') &&
                'data-form__inputs--error') ||
              ''
            }
          >
            <label className="calendarLabel" htmlFor="facilitator">Facilitator: </label>
            <input className="calendarInput"
              name="facilitator"
              type="text"
              value={forms[formNumber]?.facilitator}
              onChange={(e) => handleUpdateForm('facilitator', e.target.value)}
            />
          </div>
          <div>
            <label className="calendarLabel" htmlFor="stat">Stat: </label>
            <input className="calendarInput"
              name="stat"
              type="checkbox"
              checked={forms[formNumber]?.stat === 1}
              onChange={(e) => handleUpdateForm('stat', (e.target.checked) ? 1 : 0)}
            />
          </div>
          <div
            className={
              (errorType.includes('No Room') && 'data-form__inputs--error') ||
              ''
            }
          >
            <label className="calendarLabel" htmlFor="room">Room Number: </label>
            <input className="calendarInput"
              name="room"
              type="text"
              value={forms[formNumber]?.['room']}
              onChange={(e) => handleUpdateForm('room', e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
