// REACT IMPORTS
import { useEffect, useState } from 'react';

// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";


const ListOfUsers = ({ selectedUser }) => {

    const {user, dispatch} = useAuthContext();
    const firstname = selectedUser.firstname ? selectedUser.firstname : "";
    const imageUrl = selectedUser.img ? `http://localhost:8080/static/${selectedUser.img}` : "";
    const userId = selectedUser._id;
    const [saved, setSaved] = useState(false);

    useEffect(() => {
      if (Array.isArray(user.savedGirls)){
        user.savedGirls.map((girl) => {
          if (girl._id === selectedUser._id){
            setSaved(true);
          }
        })
      } 
    }, [dispatch, user]);

    const handleClick = async () => {

      const token = localStorage.getItem('token');
      if (token) {

        const res = await fetch('http://localhost:8080/user/save', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ saveUserId: userId})
              })
        const json = await res.json()
        console.log(json)
  
        if (res.ok) {
          dispatch({type: 'UPDATE_USER', payload: json.user})
          setSaved(true);
          console.log("Saved one user", json)
        }
      }
    }

  return (

    <div className="user-card">
      <p>{firstname}</p> 
      {imageUrl && <img src={imageUrl} alt="" width="100" height="100" /> }
      {saved ? <button onClick={handleClick}>Remove</button> : <button onClick={handleClick}>Save</button>}
    </div>
    
  )
}

export default ListOfUsers;