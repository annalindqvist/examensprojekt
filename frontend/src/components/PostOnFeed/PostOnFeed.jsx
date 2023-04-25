import { usePostContext } from '../../hooks/usePostContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostOnFeed = ({ post }) => {

  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const postContent = post.post ? post.post : "";
  const firstname = post.postedBy.firstname ? post.postedBy.firstname : "";
  const postId = post._id ? post._id : "";
  
  const handleClick = async () => {
    if (!user) {
      return
    }

    const res = await fetch('http://localhost:8080/feed/delete/' + postId,  {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await res.json()

    if (res.ok) {
      dispatch({type: 'DELETE_POST', payload: json.id})
    }
  }
  
  return (
    <div className="postOnFeed">
     
      <h4>{firstname}</h4>
      <p>{postContent}</p> 
      {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
      {post.postedByUser && <span onClick={handleClick}>delete</span> } 
    </div>
  )
}

export default PostOnFeed;