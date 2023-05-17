import { createContext, useReducer } from 'react';

export const SocketContext = createContext();

export const SocketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHATS': 
    console.log("SET_CHATS", action.payload);
      return {
        ...state, 
        listOfChats: action.payload
      }
    case 'SET_SELECTED_CHAT':
      console.log("SET_SELECTED_CHAT", action.payload)
      return {
        selectedChat: action.payload
      }
    case 'CHAT_NOTIFICATIONS':
      console.log("CHAT_NOTIFICATIONS")
      return {
        ...state, chatNotifications: action.payload._id
      }
    case 'OTHER_NOTIFICATINS':
      console.log("OTHER_NOTIFICATIONS")
    return {
      ...state, otherNotifications: action.payload._id
    }
    default:
      return state;
  }
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, {
    listOfChats: null,
    selectedChat: null,
    chatNotifications: null,
    otherNotifications: null
  });
  

  return (
    <SocketContext.Provider value={{...state, dispatch}}>
      { children }
    </SocketContext.Provider>
  )
}