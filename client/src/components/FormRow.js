import './formrow.css';

export default function FormRow({
  formNumber,
  forms,
  setForms,
  errorState = false,
  errorType,
}) {
  function handleUpdateForm(field, value) {
    const newForms = [...forms];
    newForms[formNumber] = {...newForms[formNumber], [field]: value};
    setForms(newForms);
  }
  console.log('forms, form number', forms, formNumber, forms[formNumber]?.date);

  return (
    <div className="calendarForm">
      <form
        className={`calendarInputs data-form ${
          errorState ? 'data-form--error' : 'calendarInputs'
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
            <input className="calendarInput"
              name="date"
              type="date"
              value={
                forms[formNumber]?.date
                  ? new Date(forms[formNumber].date).toISOString().split('T')[0]
                  : undefined
              }
              onChange={(e) => handleUpdateForm('date', e.target.value)}
            />
          </div>
          <div>
            <label className="calendarLabel" htmlFor="start-time">Start Time: </label>
            <input className="calendarInput"
              name="start-time"
              type="time"
              value={forms[formNumber]?.['start-time']}
              onChange={(e) => handleUpdateForm('start-time', e.target.value)}
            />
          </div>
          <div>
            <label className="calendarLabel" htmlFor="end-time">End Time: </label>
            <input className="calendarInput"
              name="end-time"
              type="time"
              value={forms[formNumber]?.['end-time']}
              onChange={(e) => handleUpdateForm('end-time', e.target.value)}
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
              value={forms[formNumber]?.stat}
              onChange={(e) => handleUpdateForm('stat', e.target.value)}
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
