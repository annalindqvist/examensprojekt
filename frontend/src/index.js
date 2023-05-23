import React from 'react';
import ReactDOM from 'react-dom/client';
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

reportWebVitals();
