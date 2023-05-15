import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import {useState, useEffect} from "react";
import { useAuthContext } from './hooks/useAuthContext'

// PAGES
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Comments from "./pages/SelectedPost";
import SavedFriends from "./pages/SavedFriends";
import NoPage from "./pages/NoPage";
import Navbar from "./components/Navbar/Navbar";
import Users from './pages/Users';
import OneUser from './pages/OneUser';
import EditProfile from './pages/EditProfile';
import EditProfilePicture from './pages/EditProfilePicture';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import PostToFeedPage from './pages/PostToFeedPage';


export default function App() {

  const { user } = useAuthContext()
  console.log("USER", user)

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
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

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
