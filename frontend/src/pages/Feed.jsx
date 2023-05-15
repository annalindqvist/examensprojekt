
// REACT IMPORTS
import { useEffect }from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENTS IMPORTS
import PostOnFeed from "../components/PostOnFeed/PostOnFeed";
import PostToFeed from "../components/PostFeed/PostToFeed";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/feed`


const Feed = () => {

  // const URL1 = "http://localhost:8080/feed";
  // const URL2 = "http://localhost:8080/feed";


  const {posts, dispatch} = usePostContext();
  const {user} = useAuthContext();
  const imageUrl = `http://localhost:8080/static/${user?.img}`;
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      const res = await fetch('http://localhost:8080/feed', {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();
      console.log("json feed", json)
      if (res.ok) {
        dispatch({type: 'SET_POST', payload: json});
      }
      if(!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchPosts();
    }
  }, [dispatch, user]);

    return (
      <div className="pink-background flex">
        <div className="logo flex">
          <h1 className="lily-font dark-text l-font">GalVibe</h1>
          <h2 className="dark-text xs-font">The place to connect with new gals!</h2>
        </div>

       
          <Link to="/share-post" className="post-input-container flex-row">
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
            <p className="s-font dark-text">Share a post {user?.firstname}!</p>
          </Link>
         
          {/* <PostToFeed/> */}
        

        <div className="postOnFeed">
          {posts && posts.map((post) => (
            <PostOnFeed key={post._id} post={post} />
          ))}
        </div>
        
      </div>
     
    );
  };
  
  export default Feed;