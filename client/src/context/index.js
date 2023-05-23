/**
 * ContextProvider Component
 * This component serves as the provider for the global context.
 * It uses the useReducer hook to manage the state with the provided reducer and initial state.
 * The actions object is created by calling the actions function and passing the current state and dispatch.
 * The value for the global context is created using the useMemo hook to memoize the actions object.
 * The value is then provided to the GlobalContext.Provider component to make it accessible to child components.
 * The children components are rendered within the GlobalContext.Provider component.
 */

import {createContext, useMemo, useReducer} from 'react';
import {initialState} from './initialState';
import reducer from './reducer';
import {actions} from './actions';

// Create a global context
export const GlobalContext = createContext(undefined);

export default function ContextProvider({children}) {
  // Use the useReducer hook to manage the state with the provided reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create a memoized value that includes actions based on the current state and dispatch
  const value = useMemo(() => {
    return {...actions(state, dispatch)};
  }, [state]);

  // Return the GlobalContext.Provider component with the value and render the children components
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
