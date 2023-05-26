import { useEffect} from 'react';
import { usePostContext } from "../hooks/usePostContext";
import { useParams } from 'react-router';

import SelectedPostComponent from "../components/SelectedPostComponent/SelectedPostComponent";

import env from "react-dotenv";
import Navbar from '../components/Navbar/Navbar';
// `${env.REACT_APP_API_URL}/`

const Comments = () => {

    const params = useParams();
    const {selectedPost, dispatch} = usePostContext();
  
    
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPost = async () => {
      const res = await fetch(`http://143-42-49-241.ip.linodeusercontent.com:8080/feed/${params.id}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({type: 'SET_SELECTED_POST', payload: json});

      }
      if(!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchPost();
    }
  }, [dispatch, params.id]);


    return (
      <>
      <Navbar/>
      <div className="pink-background flex">
        {selectedPost && <SelectedPostComponent key={selectedPost._id} post={selectedPost} />}  
      </div>
      </>
    
    );
  };
  
  export default Comments;