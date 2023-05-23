/**
 * initialState
 * This is the initial state object for the application.
 * It contains the initial values for different properties.
 * - popupOpen: A boolean indicating whether the popup is open or not.
 * - sheetData: An array representing the sheet data.
 * - selectedDay: An object representing the selected day.
 * - userData: An object containing user data, including email and token.
 * - isAdmin: A boolean indicating whether the user is an admin or not (default: false).
 */
export const initialState = {
  popupOpen: false,
  sheetData: [],
  selectedDay: {},
  userData: {email: '', token: ''},
  isAdmin: false, // should be false by default
};
