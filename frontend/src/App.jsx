import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import {useState, useEffect} from "react";
import { useAuthContext } from './hooks/useAuthContext'

// PAGES
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Navbar from "./components/Navbar/Navbar";

export default function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Feed /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={!user ? <Home /> : <Navigate to="/" />} 
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
