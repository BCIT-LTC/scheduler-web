import { useState } from 'react';
import FormRow from '../components/FormRow';
import { updateCalendar } from '../utils/fetchFunctions';
import './form-container.css';

export const defaultFormState = {
  date: '',
  'start_time': '',
  'end_time': '',
  facilitator: '',
  stat: 0,
  room: '',
  start_date: new Date(),
  end_date: new Date(),
};

const errorMap = {
  'Same Date': 'You have two open labs scheduled for the same day',
  'No Facilitator': 'All open labs must have a facilitator',
  'No Room': 'All open labs must have a room number',
};

export default function FormContainer({
  disableAddRowButton = false,
  initialFormState = [],
  updateOrCreate = 'create',
  fetchOnSubmit = false,
}) {
  const [numberOfRows, setNumberOfRows] = useState(initialFormState.length || 1);
  const [forms, setForms] = useState(
    initialFormState.length
      ? initialFormState.map((state) => ({ ...state }))
      : [{ ...defaultFormState }]
  );
  const [formErrorState, setFormErrorState] = useState(false);
  const [errorType, setErrorType] = useState([]);
  async function handleSubmit() {
    const allRoomNumbersAreFilled = forms.every((f, i) => {
      return Boolean(f.room);
    });
    const allRowsHaveFacilitator = forms.every((f, i) => {
      return Boolean(f.facilitator);
    });
    if (
      allRoomNumbersAreFilled &&
      allRowsHaveFacilitator
    ) {
      // if (updateOrCreate === 'update') {
      //   forms[0].calendar_id = initialFormState.calendar_id;
      // }
      // temporary fix
      // if (!('stat' in forms[0])) forms[0].stat = 0;
      if (disableAddRowButton) {
        // forms[0].date = initialFormState.date;
        await updateCalendar(forms, updateOrCreate)
        document.location.reload(true);
        return;
      }

      let newForms = [];
      forms.forEach(form => {
        if (form.end_date === undefined || form.end_date === form.start_date) {
          form.date = form.start_date;
          delete form.start_date;
          delete form.end_date;
          newForms.push(JSON.parse(JSON.stringify(form)))
        } else {
          var currentDate = new Date(form.start_date);
          let end = new Date(form.end_date);
          delete form.start_date;
          delete form.end_date;
          while (currentDate <= end) {
            form.date = currentDate;
            newForms.push(JSON.parse(JSON.stringify(form)));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
      await updateCalendar(newForms, updateOrCreate)

      //CLEAR FORMS
      setForms([{ ...defaultFormState }]);
      setNumberOfRows(1);
      setFormErrorState(false);
      setErrorType([]);
      const allDateInputs = document.querySelectorAll('input[type=date]');
      if (allDateInputs.length > 0)
        [...allDateInputs].forEach((input) => {
          input.value = '';
        });
      window.location.href = '/';
    } else {
      const newErrorType = [];
      if (!allRoomNumbersAreFilled) newErrorType.push('No Room');
      if (!allRowsHaveFacilitator) newErrorType.push('No Facilitator');
      setFormErrorState(true);
      setErrorType(newErrorType);
    }
  }

  function handleAddRow() {
    setForms([...forms, { ...defaultFormState }]);
    setNumberOfRows(numberOfRows + 1);
  }

  function renderErrorMsg() {
    return errorType.map((e, index) => {
      return <div key={index}>{errorMap[e]}</div>;
    });
  }
  return (
    <>
      {Array.from(Array(numberOfRows).keys()).map((_, i) => (
        <FormRow
          setForms={setForms}
          forms={forms}
          formNumber={i}
          errorState={formErrorState}
          key={i}
          errorType={errorType}
        />
      ))}
      <div className="btnContainer">
        {!disableAddRowButton && (
          <button className="calBtnAdd" onClick={handleAddRow}>
            +
          </button>
        )}
        <button className="calBtn" onClick={handleSubmit}>
          Submit
        </button>
        {errorType && <div>{renderErrorMsg()}</div>}
      </div>
    </>
  );
}
