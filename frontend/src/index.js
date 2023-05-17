import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/UserContext'
import { PostContextProvider } from './context/PostContext'
import { AuthContextProvider } from './context/AuthContext'
import { SocketContextProvider } from './context/SocketContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
        <SocketContextProvider>
          <App />
         </SocketContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
