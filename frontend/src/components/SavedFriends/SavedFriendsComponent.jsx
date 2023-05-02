// -- REACT IMPORTS
import { Link } from 'react-router-dom';

// -- CSS
import './SavedFriendsComponent.css';

const SavedGirlComponent = ({ girl }) => {

    // Variables
    const firstname = girl.firstname;
    const city = girl.city;
    const id = girl._id;
    const imageUrl = `http://localhost:8080/static/${girl.img}`;

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

export default SavedGirlComponent;