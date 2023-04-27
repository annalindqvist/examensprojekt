import { useEffect }from 'react';
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENTS
import PostOnFeed from "../components/PostOnFeed/PostOnFeed";
import PostToFeed from "../components/PostFeed/PostToFeed";

const Feed = () => {

  const {posts, dispatch} = usePostContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      const res = await fetch("http://localhost:8080/feed", {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

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
      <div>
        <h1>Feed</h1>
        <PostToFeed/>
        <p>All Posts</p>

        <div className="postOnFeed">
          {posts && posts.map((post) => (
            <PostOnFeed key={post._id} post={post} />
          ))}
      </div>
        
      </div>
    );
  };
  
  export default Feed;