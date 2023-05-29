// REACT IMPORTS
import { useEffect } from 'react';
import { usePostContext } from "../hooks/usePostContext";
import { useParams } from 'react-router';

// IMPORT COMPONENTS
import SelectedPostComponent from "../components/SelectedPostComponent/SelectedPostComponent";
import Navbar from '../components/Navbar/Navbar';


const Comments = () => {

  const params = useParams();
  const { selectedPost, dispatch } = usePostContext();


  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:8080/feed/${params.id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_SELECTED_POST', payload: json });

      }
      if (!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchPost();
    }
  }, [dispatch, params.id]);


  return (
    <>
      <Navbar />
      <div className="pink-background flex">
        {selectedPost && <SelectedPostComponent key={selectedPost._id} post={selectedPost} />}
      </div>
    </>

  );
};

export default Comments;