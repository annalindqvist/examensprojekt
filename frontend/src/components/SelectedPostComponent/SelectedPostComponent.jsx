// REACT IMPORTS
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

// IMPORT ICONS
// import { HiOutlineTrash } from 'react-icons/hi2';
// import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
// import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
// import { BsSend } from 'react-icons/bs';



const SelectedPostComponent = ({ post }) => {

  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const [postedByUser, setPostedByUser] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [comment, setComment] = useState();
  const postContent = post.post ? post.post : "Unknown";
  const firstname = post.postedBy ? post.postedBy.firstname : "Unknown";
  const postId = post._id ? post._id : "Unknown";
  const city = post.postedBy ? post.postedBy.city : "Unknown";
  const image = post.postedBy ? post.postedBy.img : "Unknown";

  const imageUrl = `http://143-42-49-241.ip.linodeusercontent.com:8080/static/${image}`;

  console.log("post",post)
  useEffect(() => {
    if (post.postedBy._id == user._id) {
      setPostedByUser(true);
    }
  }, [post.postedBy._id, user._id]);

  // --- if post liked by user - show pink filled heart
  useEffect(() => {
    const checkLikedBy = post.likes.some((like) => like.likedBy._id === user._id);

    if (checkLikedBy) {
      setLikedByUser(true);
    } else {
      setLikedByUser(false);
    }
  }, [post, user._id]);

  useEffect(() => {
    if (post.likes) {
      setLikes(post.likes.length)
    }
    
  }, [dispatch, post]);

  useEffect(() => {
    if (post.comments) {
      setComments(post.comments.length)
    }
    
  }, [dispatch, post]);

  const handleLike = async () => {

    const token = localStorage.getItem('token');
    if (token) {

      const res = await fetch('http://143-42-49-241.ip.linodeusercontent.com:8080/feed/like/' + postId, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log("like json", json)

      if (res.ok) {
        dispatch({ type: 'UPDATE_POST', payload: json.posts })
        dispatch({ type: 'SET_SELECTED_POST', payload: json.selectedPost })
      }
    }
  }

  const handleDelete = async () => {

    const token = localStorage.getItem('token');
    if (token && postedByUser) {

      const res = await fetch('http://143-42-49-241.ip.linodeusercontent.com:8080/feed/delete/' + postId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await res.json()
      console.log(json)

      if (res.ok) {
        dispatch({ type: 'DELETE_POST', payload: json })
      }
    }
  }

  const handleComment = async (e) => {

    const token = localStorage.getItem('token');

    if (token) {
      e.preventDefault();
      if (!user) {
        // setError("You must be signed in to post.");
        return;
      }

      const res = await fetch(`http://143-42-49-241.ip.linodeusercontent.com:8080/feed/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment })
      })
      const json = await res.json();

      if (!res.ok) {
        console.log(res, json);
      };
      if (res.ok) {
        setComment('');
        dispatch({ type: 'UPDATE_POST', payload: json.posts });
        dispatch({ type: 'SET_SELECTED_POST', payload: json.selectedPost });
      };
    }
  };


  return (

      <div className="post light-background selected-post">
        <div className="flex-row">
          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
          <div className="">
            <p className="m-font m-weight">{firstname}</p>
            <div className="time-city">
            <p className="xs-font grey-text">23 min ago | {city}</p>
          </div>
            {postedByUser && <span className="delete-post" onClick={handleDelete}>delete</span>}
            {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
          </div>
        </div>

        <p className="m-font">{postContent}</p>
        <div className="flex-row post-like-comment">
          {likedByUser ? (
            <span onClick={handleLike} className="flex-row mediumpink-text">
              liked
              {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
            </span>
          ) : (
              <span onClick={handleLike} className="flex-row dark-text">
               like
                {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
              </span>
          )}
         <span className="black-text flex-row">comments{comments > 0 ? <p className="liked-commented dark-text">{comments}</p> : ''}</span>

        </div>

        <div className="comments-container">
          {post.comments && post.comments.map((comment) => (

            <div className="flex-row" key={comment._id}>
               {comment.postedBy.img && <div style={{ backgroundImage: `url(http://143-42-49-241.ip.linodeusercontent.com:8080/static/${comment.postedBy.img})`}} alt="profileimage" className="s-profile-img"/> }
              <div className="comment-flex">
              <p className="m-weight m-font">{comment.postedBy.firstname}</p>
              <p className="m-font">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="share-post-input">
          <textarea name="comment" id="comment" cols="30" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
          <span onClick={handleComment}>send</span>
        </form>
      </div>
    

  )
}

export default SelectedPostComponent;
