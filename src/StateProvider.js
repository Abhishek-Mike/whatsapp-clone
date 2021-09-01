import React, {createContext,useContext,useReducer} from 'react';

//creating context where data lives 
export const StateContext = createContext();

//StateProvider is data layer
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

// pulls data from data layer
export const useStateValue = () => useContext(StateContext);