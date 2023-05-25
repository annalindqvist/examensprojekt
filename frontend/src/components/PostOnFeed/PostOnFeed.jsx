// REACT IMPORTS
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { usePostContext } from '../../hooks/usePostContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// ICONS IMPORT
import { HiOutlineTrash } from 'react-icons/hi2';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';

// IMPORT DATE FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostOnFeed = ({ post }) => {
  
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
  const image = post.postedBy ? post.postedBy.img : "defaultimg.png";
  const createdAt = post.createdAt ? post.createdAt : "";
  const postedById = post.postedBy ? post.postedBy._id : "";

  const imageUrl = `http://localhost:8080/static/${image}`;

  // --- if posted by user - setPostedByUser(true) - to display delete button
  useEffect(() => {
    if (post.postedBy?._id === user._id){
      setPostedByUser(true);
    }
  }, [post.postedBy?._id, user._id]);

  // --- if post liked by user - show pink filled heart
  useEffect(() => {
    
    const checkLikedBy = post.likes.some((like) => like.likedBy?._id === user._id);
    
    if (checkLikedBy) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [post, user._id]);

  // --- get total amout of likes
  useEffect(() => {
    if (post.likes){
        setLikes(post.likes.length)
    }
  }, [dispatch, post]);

  // --- get total amout of comments
  useEffect(() => {
    if (post.comments){
        setComments(post.comments.length)
    }
  }, [dispatch, post]);

  // --- handle delete post - only if the user has posted it
  const handleDelete = async () => {

    const token = localStorage.getItem('token');
    if (token && postedByUser) {

      const res = await fetch(`http://localhost:8080/feed/delete/` + postId,  {
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

  // --- like and dislike post
  const handleLike = async () => {

    const token = localStorage.getItem('token');
    if (token) {

      const res = await fetch(`http://localhost:8080/feed/like/` + postId,  {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({type: 'UPDATE_POST', payload: json.posts})
      }
    }
  }
  
  return (
    <div className="post">

      <div className="flex-row">
        {/* Link to profile */}
        {postedById && <Link to={`/user/${postedById}`}>
          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
        </Link>}
        
        <div>
          <p className="m-font m-weight dark-text">{firstname}</p>
          {postedByUser && <span className="delete-post" onClick={handleDelete}><HiOutlineTrash/></span> } 
          <div className="time-city">
            <p className="xs-font grey-text">{createdAt? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : createdAt}  | {city}</p>
          </div>
        </div>
      </div>
   
      <p className="post-content s-font">{postContent}</p> 
      <div className="flex-row post-like-comment">
      {likedByUser ? (
          <span onClick={handleLike} className="flex-row mediumpink-text">
            <RiHeart3Fill/>
            {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
          </span>
          ) : (
            
              <span onClick={handleLike} className="flex-row dark-text">
                <RiHeart3Line/>
                {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
              </span>
            
          )}        
        <Link to={`/feed/${postId}`}>
          <span className="black-text flex-row"><HiOutlineChatBubbleOvalLeftEllipsis/>{comments > 0 ? <p className="liked-commented dark-text">{comments}</p> : ''}</span>
        </Link>
      </div>
    </div>
  )
}

export default PostOnFeed;