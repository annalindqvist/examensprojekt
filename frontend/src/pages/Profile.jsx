// REACT IMPORTS
import { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from '../hooks/useSignoutContext';

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const Profile = () => {
  
    const { signout } = useSignout();
    const {user} = useAuthContext();
    const imageUrl = `http://143-42-49-241.ip.linodeusercontent.com:8080/static/${user.img}`;

    const handleClick = () => {
      signout();
    };

    return (
      <div>
        <h1>Your profile</h1>
        <img src={imageUrl} alt="" width="100" height="100" />
        <p>Firstname: {user.firstname}</p>
        <p>Lastname: {user.lastname}</p>
        <p>Age: {user.age}</p>
        <p>City: {user.city}</p>
        <p>Interests:</p>
        {user.intrests && user.intrests.map((interest) => (
            <p key={interest}>{interest}</p>
          ))}
           <p>Your decription</p>
        <div>{user.description}</div>
        <Link to="/user/edit">Edit profile</Link>
        <Link to="/user/edit-profile-picture">Edit profile picture</Link>
        <Link to="/user/settings">Settings</Link>
        <button onClick={handleClick}>Sign out</button>
    </div>
    );
  };
  
  export default Profile;