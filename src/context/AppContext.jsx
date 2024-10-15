/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

// Create a context
export const AppContext = createContext();

// Define the initial state
const initialState = {
  fuckoMode: false,
  isClockwise: true,
  rotation: 0,
};

// Define a reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FUCKO_MODE":
      return { ...state, fuckoMode: !state.fuckoMode };
    case "TOGGLE_SPIN_DIRECTION":
      return { ...state, isClockwise: !state.isClockwise, rotation: action.payload };
    default:
      return state;
  }
};

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
