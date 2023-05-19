// REACT IMPORTS
import { useEffect, useState } from 'react';
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

  const { listOfUsers, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8080/all-users`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_USERS', payload: json });
      }
      if (!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchUsers();
    }
  }, [dispatch, user]);



  return (
    <div className="pink-background">
      <div className="logo flex">
        <h1 className="lily-font dark-text l-font">GalVibe</h1>
      </div>
      <div className="inner-container">
        <div className="btn-container">
          <span onClick={() => setAllUsers(true)} className={allUsers ? "active-btn s-font m-weight white-text" : "btn s-font"}>Explore</span>
          <span onClick={() => setAllUsers(false)} className={!allUsers ? "active-btn s-font m-weight white-text" : "btn s-font"}>Saved gals</span>
        </div>


        {allUsers ? (
          <>
            {listOfUsers && listOfUsers.map((users) => {
              if (users._id !== user._id) {
                return <ListOfUsers key={users._id} user={users} />;
              }
              return null;
            }
            )}
          </>
        ) : (
          <>
            {user.savedGirls && user.savedGirls.map((girl) => (
              <SavedFriendsComponent key={girl._id} girl={girl} />
            ))}
          </>
        )}

      </div>
    </div>


  );
};

export default Users;