// REACT IMPORTS 
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// IMPORT ICONS
import { MdOutlinePlace } from 'react-icons/md';

const ListOfUsers = ({ user }) => {

  const firstname = user.firstname ? user.firstname : "Unknown";
  const age = user.age ? user.age + " y": "Unknown";
  const city = user.city ? user.city : "Unknown";
  const [description, setDescription] = useState(null);
  const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : 'http://localhost:8080/static/defaultimg.png';

  useEffect(() => {
    if (user.description?.length > 66) {
      setDescription(user.description?.substring(0, 66) + "...")
    }
    else {
      setDescription(user.description);
    }
  }, [user]);

return (
  <>
    <Link to={`/user/${user._id}`}>
      <div className="user-card-container flex-column">
        <div className="user-card-top">
          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="m-profile-img" />}
          <div className="flex-column">
            <div className="flex-column notification-parent-list">
              <p >{firstname}</p>
              <div className="time-city">
              <p className="xs-font grey-text flex-row">{age} <span>|</span> <span className="user-card-city"> <MdOutlinePlace className="xss-icon profile-icon"/>{city}</span></p>
              </div>
              <p className="s-font">{description ? description : ''}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </>
)
}

export default ListOfUsers;