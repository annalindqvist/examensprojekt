import { useEffect, useState } from 'react';
import { usePostContext } from '../../hooks/usePostContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostOnFeed = ({ post }) => {
  console.log(post)
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const [postedByUser, setPostedByUser] = useState(false);

  const postContent = post.post ? post.post : "Unknown";
  const firstname = post.postedBy ? post.postedBy.firstname : "Unknown";
  const postId = post._id ? post._id : "Unknown";

  useEffect(() => {
    if (post.postedBy._id == user._id){
      setPostedByUser(true);
    }
  }, [post.postedBy._id, user._id]);

  const handleClick = async () => {

    const token = localStorage.getItem('token');
    if (token && postedByUser) {

      const res = await fetch('http://localhost:8080/feed/delete/' + postId,  {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({type: 'DELETE_POST', payload: json})
      }
    }
  }
  
  return (
    <div className="postOnFeed">
     
      <h4>{firstname}</h4>
      <p>{postContent}</p> 
      {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
      {postedByUser && <span onClick={handleClick}>delete</span> } 
    </div>
  )
}

export default PostOnFeed;