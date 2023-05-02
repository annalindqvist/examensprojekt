// REACT IMPORTS 
import { Link } from 'react-router-dom';

// CSS
import './ListOfUsers.css';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ListOfUsers = ({ user }) => {

  const firstname = user.firstname ? user.firstname : "";
  const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : "";

  return (
    <Link to={`/user/${user._id}`}>
      <div className="user-card">
        <p>{firstname}</p> 
        {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
      </div>
    </Link>
  )
}

export default ListOfUsers;