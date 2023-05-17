// REACT IMPORTS
import { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORT
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENT IMPORTS
import ListOfUsers from '../components/ListOfUsers/ListOfUsers';
import SavedFriendsComponent from "../components/SavedFriends/SavedFriendsComponent";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const Users = () => {

  const {listOfUsers, dispatch} = useUserContext();
  const {user} = useAuthContext();
  const [allUsers, setAllUsers] = useState(true)

  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8080/all-users`, {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({type: 'SET_USERS', payload: json});
      }
      if(!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchUsers();
    }
  }, [dispatch, user]);

  

    return (
      <div className="pink-background">
        <h1>All users</h1>
        <span onClick={() => setAllUsers(true)}>Explore</span>
        <span onClick={() => setAllUsers(false)}>Saved</span>

        {allUsers ? (
        <>
          <div className="list-of-users">
            {listOfUsers && listOfUsers.map((users) => {
              if (users._id !== user._id) {
                return <ListOfUsers key={users._id} user={users} />;
              }
              return null;
            }
            )}
      </div>
        </>
      ) : (
        <>
          <h1>Saved</h1>
          {user.savedGirls && user.savedGirls.map((girl) => (
            <SavedFriendsComponent key={girl._id} girl={girl} />
          ))}
        </>
      )}

        
      </div>
        
     
    );
  };
  
  export default Users;