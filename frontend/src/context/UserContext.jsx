import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS': 
    console.log("SET_USERS");
      return {
        ...state, 
        listOfUsers: action.payload
      }
    case 'SET_SELECTED_USER':
      return {
        ...state, selectedUser: action.payload
      }
    case 'DELETE_USER':
      return {
        listUser: state.listUser.filter((u) => u._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    listOfUsers: null,
    selectedUser: null
  });
  

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}