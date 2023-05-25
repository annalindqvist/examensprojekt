// REACT IMPORTS
import { Link } from 'react-router-dom';

// IMPORT ICON
import { MdOutlinePlace } from 'react-icons/md';

const SavedFriendComponent = ({ girl }) => {

    const firstname = girl.firstname ? girl.firstname : "Unknown";
    const city = girl.city ? girl.city : "Unknown";
    const id = girl._id;
    const age = girl.age ? girl.age + " y" : "Unknown";
    const imageUrl = girl.img ? `http://localhost:8080/static/${girl.img}` : 'http://localhost:8080/static/defaultimg.png';

  return (
    <div className="user-card">
        <Link to={`/user/${id}`} className="flex-row">
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
            <div className="user-card-info">
                {firstname && <p >{firstname}</p>}
                <p className="xs-font grey-text flex-row">{age} <span>|</span> <span className="user-card-city"> <MdOutlinePlace className="xss-icon profile-icon"/>{city}</span></p>
            </div>
        </Link>
    </div>
  )
}

export default SavedFriendComponent;