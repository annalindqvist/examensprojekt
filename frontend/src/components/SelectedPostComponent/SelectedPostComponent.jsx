// REACT IMPORTS
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// IMPORT COMPONENTS
import BackBtnComponent from "../../components/GoBackBtnComponent/BackBtnComponent";

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

// IMPORT ICONS
import { HiOutlineTrash } from 'react-icons/hi2';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { BsSend } from 'react-icons/bs';
import { MdOutlinePlace } from 'react-icons/md';

// IMPORT DATE FNS
import { formatDistanceToNow } from 'date-fns';

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
  const image = post.postedBy.img ? post.postedBy.img : "defaultimg.png";
  const postedById = post.postedBy ? post.postedBy._id : "";
  const createdAt = post.createdAt ? post.createdAt : new Date();
  const imageUrl = `http://143-42-49-241.ip.linodeusercontent.com:8080/static/${image}`;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    navigate('/');
  };


  useEffect(() => {
    if (post.postedBy._id === user._id) {
      setPostedByUser(true);
    }
  }, [post.postedBy._id, user._id]);

  // --- if post liked by user - show pink filled heart
  useEffect(() => {
    const checkLikedBy = post.likes.some((like) => like.likedBy?._id === user._id);

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

      if (res.ok) {
        dispatch({ type: 'DELETE_POST', payload: json })
      }
    }
  }

  const handleDeleteComment = async (id) => {

    const token = localStorage.getItem('token');
    if (token) {

      const res = await fetch('http://143-42-49-241.ip.linodeusercontent.com:8080/feed/comment/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId })
      })
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_SELECTED_POST', payload: json.selectedPost })
      }
    }
  }

  const handleComment = async (e) => {

    const token = localStorage.getItem('token');

    if (token) {
      e.preventDefault();
      if (!user) {
        handleNavigate();
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
        setError("Sorry something went wrong.")
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
        <BackBtnComponent />
        {/* Link to profile */}
        {postedById && <Link to={`/user/${postedById}`}>
          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
        </Link>}
        <div className="">
          <p className="m-font m-weight">{firstname}</p>
          <div className="time-city">
            <p className="xs-font grey-text flex-row">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })} | <span className="flex-row"><MdOutlinePlace className="xss-icon profile-icon"/>{city}</span></p>
          </div>
          {postedByUser && <span className="delete-post" onClick={handleDelete}><HiOutlineTrash /></span>}
        </div>
      </div>

      <p className="m-font post-content">{postContent}</p>
      <div className="flex-row post-like-comment">
        {likedByUser ? (
          <span onClick={handleLike} className="flex-row mediumpink-text">
            <RiHeart3Fill />
            {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
          </span>
        ) : (
          <span onClick={handleLike} className="flex-row dark-text">
            <RiHeart3Line />
            {likes > 0 && <p className="liked-commented dark-text">{likes}</p>}
          </span>
        )}
        <span className="black-text flex-row"><HiOutlineChatBubbleOvalLeftEllipsis />{comments > 0 ? <p className="liked-commented dark-text">{comments}</p> : ''}</span>

      </div>

      <div className="comments-container">
        {post.comments && post.comments.length > 0 ? (post.comments.map((comment) => {
          const commentedByUser = comment.postedBy?._id === user._id;
          return (
            <div className="one-comment" key={comment?._id}>
              {comment.postedBy?.img ? (<div style={{ backgroundImage: `url(http://143-42-49-241.ip.linodeusercontent.com:8080/static/${comment.postedBy.img})` }} alt="profileimage" className="s-profile-img" />) : (<div style={{ backgroundImage: `url(http://143-42-49-241.ip.linodeusercontent.com:8080/static/defaultimg.png)` }} alt="profileimage" className="s-profile-img" />)}
              <div className="comment-flex one-comment-content-container">
                <p className="m-weight m-font comment-delete-relative">{comment.postedBy?.firstname ? comment.postedBy?.firstname : 'Unknown'} <span className="xs-font normal-weight">{comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : ''}</span> {commentedByUser && <span onClick={() => handleDeleteComment(comment._id)} className="comment-delete-btn"><HiOutlineTrash className="xs-icon" /></span>} </p>
                <p className="m-font">{comment?.comment}</p>
              </div>
            </div>)
        })) : (
          <p className="s-font no-comment">Be the first to comment!</p>
        )}
        {error && <div className="error-soft">{error}</div>}

      </div>

      <form className="share-comment-input">
        <textarea name="comment" id="comment" cols="30" rows="3" placeholder="Aa.." value={comment} onChange={(e) => setComment(e.target.value)} />
        <span onClick={handleComment}><BsSend /></span>
      </form>
    </div>


  )
}

export default SelectedPostComponent;
