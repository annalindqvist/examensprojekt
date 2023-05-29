// REACT IMPORTS
import { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENTS IMPORTS
import PostOnFeed from "../components/PostOnFeed/PostOnFeed";
import Navbar from '../components/Navbar/Navbar';

const Feed = () => {

  const {posts, dispatch, selectedPost} = usePostContext();
  const {user} = useAuthContext();
  const imageUrl = user?.img ? `http://localhost:8080/static/${user.img}` : 'http://localhost:8080/static/defaultimg.png';
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
        const res = await fetch('http://localhost:8080/feed', {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();
      if (res.ok) {
        dispatch({type: 'SET_POST', payload: json});
      }
      if(!res.ok) {
        setError(json.message);
      }
    }

    if (token) {
      fetchPosts();
    }
  }, [dispatch, user, selectedPost]);

    return (
      <>
      <Navbar/>
      <div className="pink-background flex">
        <div className="logo flex">
          <h1 className="lily-font dark-text l-font">GalVibe</h1>
          <h2 className="dark-text xs-font">The place to connect with new gals!</h2>
        </div>

       
          <Link to="/share-post" className="post-input-container flex-row">
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
            <p className="s-font dark-text">Share a post {user?.firstname}!</p>
          </Link>
        
        <div className="post-on-feed overflow-scroll">
          {error && <div className="error-soft">{error}</div>}
          {posts && posts.map((post) => (
            <PostOnFeed key={post._id} post={post} />
          ))}
        </div>
        
      </div>
      </>
     
    );
  };
  
  export default Feed;