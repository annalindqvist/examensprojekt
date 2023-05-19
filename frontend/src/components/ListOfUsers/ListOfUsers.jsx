// REACT IMPORTS 
import { Link } from 'react-router-dom';
import { useState } from 'react';

// CSS
import './ListOfUsers.css';

import env from "react-dotenv";
import { useEffect } from 'react';
// `${env.REACT_APP_API_URL}/`

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ListOfUsers = ({ user }) => {

  const firstname = user.firstname ? user.firstname : "";
  const age = user.age ? user.age : "";
  const city = user.city ? user.city : "";
  const [description, setDescription] = useState(null);
  const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : 'http://localhost:8080/static/defaultimg.png';

  useEffect(() => {
    
    if(user.description?.length > 66) {
      setDescription(user.description?.substring(0,66) + "...")
    }
    else {
      setDescription(user.description);
    }
  
  }, [user]);
  

  return (
    <>
      <Link to={`/user/${user._id}`}>
        <div className="user-card">
          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="m-profile-img" />}
          <div className="flex-column">
            <div className="flex-column notification-parent-list">
              <p >{firstname}</p>
              <div className="time-city">
                <p className="xs-font grey-text">{age ? age + " | " : ""}{city}</p>
              </div>
             <p className="s-font">{description ? description : ''}</p>

            </div>

          </div>

        </div>
      </Link>
    </>
  )
}

export default ListOfUsers;