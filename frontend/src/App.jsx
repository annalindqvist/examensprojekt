import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, useEffect} from "react";

// PAGES
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";


// functions
import {getTest} from "./functions/test";

export default function App() {
  
  const [data, setData] = useState("Hello World");

  useEffect(() => {
    getTest()
      .then((res)=> {
        setData(res.message);
      })
      .catch((error) => console.log(error))
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="feed" element={<Feed />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
