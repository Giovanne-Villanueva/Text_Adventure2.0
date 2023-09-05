import React, { createContext, useContext } from 'react';
import { useUserReducer } from './reducers';

// Initialize new context for students
const AdventureContext = createContext();

// We create a custom hook to provide immediate usage of the student context in other components
export const useAdventureContext = () => useContext(AdventureContext);

// StudentProvider component that holds initial state, returns provider component
export const AdventureProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useUserReducer({
    user:{},
    stories:{},
    equipment:{},
    characters:{}
  });

  // Provider components expect a value prop to be passed
  return (
    <AdventureContext.Provider value={[state, dispatch]}{...props}/>
  );
};


