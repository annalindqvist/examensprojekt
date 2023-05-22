import { createContext, useReducer, useEffect } from 'react';

// SOCKET IMPORT
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      console.log("SET_SOCKET", action.payload)
      return {
        ...state,
        socket: action.payload
      }
    case 'SET_CHATS':
      console.log("SET_CHATS", action.payload);
      return {
        ...state,
        listOfChats: action.payload
      }
    case 'SET_SELECTED_CHAT':
      console.log("SET_SELECTED_CHAT", action.payload)
      return {
        ...state,
        selectedChat: action.payload
      }
    case 'SET_CHAT_NOTIFICATIONS':
      console.log("SET_CHAT_NOTIFICATIONS", state.chatNotifications, action.payload)
      return {
        ...state, chatNotifications: [...state.chatNotifications, action.payload]
      }
    case 'DELETE_CHAT_NOTIFICATIONS':
      console.log("SET_CHAT_NOTIFICATIONS", state.chatNotifications, action.payload)
      return {
        ...state, chatNotifications: state.chatNotifications.filter((n) => n.senderId !== action.payload)
      }
    case 'SET_OTHER_NOTIFICATINS':
      console.log("SET_OTHER_NOTIFICATIONS")
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

    const socket = io('http://localhost:8080');

    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to Socket.io server.');
    });
     dispatch({ type: 'SET_SOCKET', payload: socket });

    return () => {
      console.log("socket.disconnect")
      socket.disconnect();
    };

  }, []);

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  )
}