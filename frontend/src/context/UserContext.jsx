import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': 
      return {
        listUser: action.payload
      }
    case 'UPDATE_USER':
      return {
        listUser: [action.payload, ...state.listUser]
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
    listUser: null
  });
  

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}