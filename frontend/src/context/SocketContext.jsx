import { createContext, useReducer, useEffect } from 'react';

// SOCKET IMPORT
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload
      }
    case 'SET_CHATS':
      return {
        ...state,
        listOfChats: action.payload
      }
    case 'SET_SELECTED_CHAT':
      return {
        ...state,
        selectedChat: action.payload
      }
    case 'SET_CHAT_NOTIFICATIONS':
      return {
        ...state, chatNotifications: [...state.chatNotifications, action.payload]
      }
    case 'DELETE_CHAT_NOTIFICATIONS':
      return {
        ...state, chatNotifications: state.chatNotifications.filter((n) => n.senderId !== action.payload)
      }
    case 'SET_OTHER_NOTIFICATINS':
      // Not implemented
      return {
        ...state, otherNotifications: action.payload._id
      }
    default:
      return state;
  }
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, {
    socket: null,
    listOfChats: null,
    selectedChat: null,
    chatNotifications: [],
    otherNotifications: null
  });

  useEffect(() => {

    const socket = io('https://143-42-49-241.ip.linodeusercontent.com:8080');

    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to Socket.io server.');
    });
     dispatch({ type: 'SET_SOCKET', payload: socket });

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  )
}