import { usePostContext } from '../../hooks/usePostContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostOnFeed = ({ post }) => {

  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const postContent = post.post.post;
  const firstname = post.post.postedBy.firstname;

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`http://localhost:8080/feed/${post._id}`,  {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
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