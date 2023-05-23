import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS': 
      return {
        ...state, 
        listOfUsers: action.payload
      }
    case 'SET_SELECTED_USER':
      return {
        ...state, selectedUser: action.payload
      }
    case 'FILTERED_USERS':
      return {
        ...state, filteredUsers: action.payload
      }
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    listOfUsers: null,
    selectedUser: null,
    filteredUsers: null
  });
  

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}