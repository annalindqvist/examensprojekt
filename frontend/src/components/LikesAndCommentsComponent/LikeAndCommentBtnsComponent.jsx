// REACT IMPORTS
import { useEffect, useState } from 'react';

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

const SelectedPostComponent = ({ post }) => {

  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  
  const [likedByUser, setLikedByUser] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    if (post.likes){
        setLikes(post.likes.length)
    }
    console.log("useeffct like runs")
  }, [dispatch, post]);

  useEffect(() => {
    if (post.comments){
        setComments(post.comments.length)
    }
    console.log("useeffct comment runs")
  }, [dispatch, post]);

  const handleLike = async () => {

    const token = localStorage.getItem('token');
    if (token) {

      const res = await fetch('http://localhost:8080/feed/like/' + postId,  {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log("like json", json)

      if (res.ok) {
        dispatch({type: 'UPDATE_POST', payload: json})
      }
    }
  }

  return (
    <div className="flex-row">
        <p onClick={handleLike}>Like {likes > 0 ? likes : ''}</p>
        <p>Comment{comments}</p>
    </div>
  )
}

export default SelectedPostComponent;