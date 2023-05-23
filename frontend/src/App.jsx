// IMPORT CSS
import './App.css';

// REACT IMPORTS
import ReactDOM from "react-dom/client";
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// IMPORT HOOKS
import { useAuthContext } from './hooks/useAuthContext'
import { useSocketContext } from "./hooks/useSocketContext";

// IMPORT PAGES
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Comments from "./pages/SelectedPost";
import SavedFriends from "./pages/SavedFriends";
import NoPage from "./pages/NoPage";
import Users from './pages/Users';
import OneUser from './pages/OneUser';
import EditProfile from './pages/EditProfile';
import EditProfilePicture from './pages/EditProfilePicture';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import PostToFeedPage from './pages/PostToFeedPage';
import CurrentChat from './pages/CurrentChat';
import Notifications from './pages/Notifications';

// IMPORT COMPONENTS
// import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const { socket, selectedChat, dispatch: socketDispatch } = useSocketContext();

  const { user, dispatch } = useAuthContext()

  useEffect(() => {
    if (user && socket) {
      socket.emit("newConnectedUser", user._id);
    }
  },[user, socket])

  socket?.on("newChatNotification", (notification) => {
    // Update the chat notifications state
    socketDispatch({ type: 'SET_CHAT_NOTIFICATIONS', payload: notification });

    return () => {
      // Clean up the event listener when component unmounts
      socket.off("newChatNotification");
    }
  });

  return (
    <div className="App">
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Feed /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/feed/:id" 
            element={user ? <Comments /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/share-post" 
            element={user ? <PostToFeedPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chat" 
            element={user ? <Chat /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chat/:id" 
            element={user ? <CurrentChat /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/users" 
            element={user ? <Users /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/user/:id" 
            element={user ? <OneUser /> : <Navigate to="/signin" />} 
          />
           <Route 
            path="/user/edit" 
            element={user ? <EditProfile /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/user/edit-profile-picture" 
            element={user ? <EditProfilePicture /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/user/settings" 
            element={user ? <Settings /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/user/saved" 
            element={user ? <SavedFriends /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/notifications" 
            element={user ? <Notifications /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/signin" 
            element={!user ? <Signin /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/" />} 
          />
          <Route 
            path="/terms-and-conditions" 
            element={<Terms />} 
          />
          <Route 
            path="*" 
            element={<NoPage />} 
          />

        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}


