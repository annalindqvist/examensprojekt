//import { usePostContext } from '../../hooks/usePostContext';
//import { useAuthContext } from '../../hooks/useAuthContext';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';
import './ListOfUsers.css';

const ListOfUsers = ({ user }) => {

//   const { dispatch } = usePostContext();
//   const { user } = useAuthContext();
  
  const firstname = user.firstname ? user.firstname : "";
  const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : "";
  console.log(user._id)
  return (
    <Link to={`/user/${user._id}`}>
    <div className="user-card">
      <p>{firstname}</p> 
      {imageUrl && <img src={imageUrl} alt="" width="100" height="100" /> }
    </div>
    </Link>
  )
}

export default ListOfUsers;