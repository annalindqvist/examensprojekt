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
    socket: null,
    listOfChats: null,
    selectedChat: null,
    chatNotifications: null,
    otherNotifications: null
  });

  useEffect(() => {

    const socket = io('http://localhost:8080');

    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to Socket.io server.');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server.');
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