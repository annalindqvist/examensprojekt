// REACT IMPORTS
import { Link } from 'react-router-dom';

const SavedFriendComponent = ({ girl }) => {

    const firstname = girl.firstname;
    const city = girl.city;
    const id = girl._id;
    console.log(girl)
    const imageUrl = girl.img ? `http://localhost:8080/static/${girl.img}` : 'http://localhost:8080/static/defaultimg.png';

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