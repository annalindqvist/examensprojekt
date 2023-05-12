import { useEffect} from 'react';
import { usePostContext } from "../hooks/usePostContext";
import { useParams } from 'react-router';

import SelectedPostComponent from "../components/SelectedPostComponent/SelectedPostComponent";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const Comments = () => {

    const params = useParams();
    const {selectedPost, dispatch} = usePostContext();
    
    console.log(selectedPost)

    // const URL1 = `http://localhost:8080feed/${params.id}`;
    // const URL2 = `http://localhost:8080/feed/${params.id}`;
    
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:8080feed/${params.id}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({type: 'SET_SELECTED_POST', payload: json});
        console.log("Comments.jsx", json);

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
      <div>
        <h1>One post</h1>
        {selectedPost && <SelectedPostComponent key={selectedPost._id} post={selectedPost} />}  
      </div>
    
    );
  };
  
  export default Comments;