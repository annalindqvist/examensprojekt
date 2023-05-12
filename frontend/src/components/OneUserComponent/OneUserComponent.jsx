// REACT IMPORTS
import { useEffect, useState } from 'react';

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const ListOfUsers = ({ selectedUser }) => {

    const {user, dispatch} = useAuthContext();
    const firstname = selectedUser.firstname ? selectedUser.firstname : "";
    const imageUrl = selectedUser.img ? `http://localhost:8080static/${selectedUser.img}` : "";
    const userId = selectedUser._id;
    const intrests = selectedUser.intrests;
    const [saved, setSaved] = useState(false);

    // if user is saved to friends setSaved(true) else setSaved(false)
    useEffect(() => {
      const isSaved = Array.isArray(user.savedGirls) && 
        user.savedGirls.some((girl) => girl._id === selectedUser._id);
        setSaved(isSaved);
    }, [user.savedGirls, selectedUser._id]);

    // if clicked to save/remove friend
    const handleClick = async () => {

      const token = localStorage.getItem('token');
      if (token) {

        const res = await fetch(`http://localhost:8080/user/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ saveUserId: userId})
            })
        const json = await res.json()
        console.log("json savegirl", json)
  
        if (res.ok) {
          dispatch({type: 'UPDATE_USER', payload: json.user})
          localStorage.setItem('user', JSON.stringify(json.user));
          //console.log("Saved one user", json)
        }
      }
    }

  return (

    <div className="user-card">
      <p>{firstname}</p> 
      {imageUrl && <img src={imageUrl} alt="" width="100" height="100" /> }
      <p>Interests:</p>
        {intrests && intrests.map((interest) => (
          <p key={interest}>{interest}</p>
        ))}
      {saved ? <button onClick={handleClick}>Remove</button> : <button onClick={handleClick}>Save</button>}
    </div>
    
  )
}

export default ListOfUsers;