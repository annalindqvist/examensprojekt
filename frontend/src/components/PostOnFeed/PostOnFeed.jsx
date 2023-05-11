// REACT IMPORTS
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { usePostContext } from '../../hooks/usePostContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// CSS IMPORT
import './PostOnFeed.css';

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostOnFeed = ({ post }) => {
  console.log(post)
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const [postedByUser, setPostedByUser] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const postContent = post.post ? post.post : "Unknown";
  const firstname = post.postedBy ? post.postedBy.firstname : "Unknown";
  const postId = post._id ? post._id : "Unknown";
  const city = post.postedBy ? post.postedBy.city : "Unknown";
  const image = post.postedBy ? post.postedBy.img : "Unknown";

  const imageUrl = `http://localhost:8080/static/${image}`;

  useEffect(() => {
    if (post.postedBy._id == user._id){
      setPostedByUser(true);
    }
  }, [post.postedBy._id, user._id]);

  useEffect(() => {
    if (post.likes){
        setLikes(post.likes.length)
    }
    console.log("useeffct runs")
  }, [dispatch, post]);

  useEffect(() => {
    if (post.comments){
        setComments(post.comments.length)
    }
    console.log("useeffct comment runs")
  }, [dispatch, post]);

  const handleDelete = async () => {

    const token = localStorage.getItem('token');
    if (token && postedByUser) {

      const res = await fetch(`${env.REACT_APP_API_URL}/feed/delete/` + postId,  {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log(json)

      if (res.ok) {
        dispatch({type: 'DELETE_POST', payload: json})
      }
    }
  }

  const handleLike = async () => {

    const token = localStorage.getItem('token');
    if (token) {

      const res = await fetch(`${env.REACT_APP_API_URL}/feed/like/` + postId,  {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log("like json", json)

      if (res.ok) {
        dispatch({type: 'UPDATE_POST', payload: json.posts})
      }
    }
  }
  
  return (
    <div className="post">

      <div className="flex-row">
        {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
        <div>
          <p className="m-font m-weight blue-text">{firstname}</p>
          {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
          {postedByUser && <span className="delete-post xs-font" onClick={handleDelete}>delete</span> } 
          <div className="time-city">
            <p className="xs-font grey-text">23 min ago | {city}</p>
          </div>
        </div>
      </div>
   
      <p className="post-content s-font">{postContent}</p> 
      <div className="flex-row">
        <p onClick={handleLike}>Like {likes > 0 ? likes : ''}</p>
        <Link to={`/feed/${postId}`}>
          <p className="black-text">Comment {comments}</p>
        </Link>
      </div>
    </div>
  )
}

export default PostOnFeed;