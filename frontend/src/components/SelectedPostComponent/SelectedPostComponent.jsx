// REACT IMPORTS
import { useEffect, useState } from 'react';

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";

const SelectedPostComponent = ({ post }) => {

  console.log("POST", post)

  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const [postedByUser, setPostedByUser] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const [comment, setComment] = useState();
  console.log(comment);
  

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
        dispatch({type: 'UPDATE_POST', payload: json.posts})
        dispatch({type: 'SET_SELECTED_POST', payload: json.selectedPost})
      }
    }
  }

  const handleDelete = async () => {

    const token = localStorage.getItem('token');
    if (token && postedByUser) {

      const res = await fetch('http://localhost:8080/feed/delete/' + postId,  {
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

  const handleComment = async (e) => {

    const token = localStorage.getItem('token');

    if (token) {
        e.preventDefault();
        if (!user) {
            // setError("You must be signed in to post.");
            return;
        }

        const res = await fetch(`http://localhost:8080/feed/comment/${postId}`, {
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
            dispatch({type: 'UPDATE_POST', payload: json.posts});
            dispatch({type: 'SET_SELECTED_POST', payload: json.selectedPost});
        };
    }
};
console.log(post.comments)

  return (

    <div className="selected-post">
      <div className="post">
      <div className="flex-row">
        {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
        <div className="">
          <p className="s-font m-weight">{firstname}</p>
          <p className="xs-font">{city}</p>
          {postedByUser && <span className="margin-left-auto" onClick={handleDelete}>delete</span> } 
          {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
      </div>
      </div>
   
    <p>{postContent}</p> 
    <div className="flex-row">
      <p onClick={handleLike}>Like {likes > 0 ? likes : ''}</p>
        <p>Comment{comments > 0 ? comments : ''}</p>
    </div>
    </div>

    <div className="flex">
      {post.comments && post.comments.map((comment) => (
        <div className="flex-row" key={comment._id}> 
          <p className="m-weight">{comment.postedBy.firstname}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>

      <form onSubmit={handleComment}>
        <textarea name="comment" id="comment" cols="30" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}/>
        <input  type="submit" value="Send" />
      </form>
    </div>
    
  )
}

export default SelectedPostComponent;