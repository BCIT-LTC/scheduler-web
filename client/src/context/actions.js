/**
 * Actions
 * This is an object that contains various actions to be used with a state and dispatch function.
 * The actions allow for updating the state with different values.
 * It takes the current state and dispatch function as parameters.
 * The available actions include:
 * - setPopup: Updates the value of "popup" in the state based on the provided boolean value.
 * - setSelectedDay: Updates the value of "selectedDay" in the state based on the provided value.
 * - updateUserData: Updates the user data in the state with the provided email, token, and isAdmin values.
 * Each action is dispatched with the appropriate type and payload to update the state accordingly.
 */
export const actions = (state, dispatch) => ({
  state,
  dispatch,
  setPopup: (open) => {
    dispatch({type: 'setPopup', payload: open});
  },
  setSelectedDay: (selectedDay) => {
    dispatch({type: 'setSelectedDay', payload: selectedDay});
  },
  updateUserData: (email, token, isAdmin) => {
    dispatch({
      type: 'updateUser',
      payload: {
        userData: {
          email,
          token,
          isAdmin,
        },
      },
    });
  },
});
