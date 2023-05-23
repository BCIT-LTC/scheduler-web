import {useState} from 'react';
import {read, utils} from 'xlsx';

/**
 * useReadSpreadsheet Hook
 * This custom hook handles reading and parsing a spreadsheet file.
 * It returns functions and state values to handle file selection, submission, and extracted sheet data.
 */

export default function useReadSpreadsheet() {
  // State for the selected file and sheet data
  const [file, setFile] = useState('');
  const [sheetData, setOpenLab] = useState([]);

  // Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    readSheet();
  };

  // Function to read and parse the selected sheet
  async function readSheet() {
    const f = await file.arrayBuffer(); // Convert file to array buffer
    const wb = read(f); // Parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // Get the first worksheet
    const data = utils.sheet_to_json(ws); // Generate objects from sheet data
    setOpenLab(data); // Update the state with sheet data
  }

  // Event handler for file selection
  function changeHandler(e) {
    setFile(e.target.files[0]); // Set the selected file
  }

  // Return the event handlers and sheet data
  return {changeHandler, submitHandler, sheetData};
}
