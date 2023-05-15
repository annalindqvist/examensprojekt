// -- REACT IMPORTS
import { Link } from 'react-router-dom';

// -- CSS
import './SavedFriendsComponent.css';

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const SavedFriendComponent = ({ girl }) => {

    // Variables
    const firstname = girl.firstname;
    const city = girl.city;
    const id = girl._id;
    const imageUrl = `http://143-42-49-241.ip.linodeusercontent.com/static/${girl.img}`;

  return (
    <div className="user-card">
        <Link to={`/user/${id}`} className="flex-row">
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
            <div className="user-card-info">
                {firstname && <p >{firstname}</p>}
                {city && <p className="xs-font">{city}</p>}
            </div>
        </Link>
    </div>
  )
}

export default SavedFriendComponent;