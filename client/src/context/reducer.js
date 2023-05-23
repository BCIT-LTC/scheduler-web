/**
 * reducer Function
 * This function specifies how the state should be updated based on different action types.
 * It takes the current state and an action object as parameters.
 * The function uses a switch statement to determine the action type and perform the appropriate state update.
 * The function returns a new state object with the updated values.
 */

export default function reducer(state, action) {
  switch (action.type) {
    case 'setPopup':
      return {
        ...state,
        popupOpen: action.payload,
      };
    case 'closePopup':
      return {
        ...state,
        popupOpen: false,
      };
    case 'setSelectedDay':
      return {
        ...state,
        selectedDay: action.payload,
      };
    case 'updateUser':
      return {
        ...state,
        userData: action.payload.userData,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
}
