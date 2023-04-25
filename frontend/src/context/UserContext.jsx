import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': 
      return {
        onlineUser: action.payload
      }
    case 'UPDATE_USER':
      return {
        onlineUser: [action.payload, ...state.onlineUser]
      }
    case 'DELETE_USER':
      return {
        onlineUser: state.onlineUser.filter((u) => u._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    onlineUser: null
  });

  return (
    <UserContext.Provider value={{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}