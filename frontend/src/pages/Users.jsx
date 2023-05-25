// REACT IMPORTS
import { useEffect, useState } from 'react';

// HOOKS IMPORT
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENT IMPORTS
import ListOfUsers from '../components/ListOfUsers/ListOfUsers';
import SavedFriendsComponent from "../components/SavedFriends/SavedFriendsComponent";
import FilterUserComponent from '../components/FilterUsersComponent/FilterUsersComponent';

// IMPORT ICONS

import {IoFilterCircleOutline} from 'react-icons/io5'
import Navbar from '../components/Navbar/Navbar';

const Users = () => {

  const { listOfUsers, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState(true)
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState(null);


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
        setError(json.message);
      }
    }

    if (token) {
      fetchUsers();
    }
  }, [user, dispatch]);

  const handleStateChange = (value) => {
    setFilter(value);
  };
  const handleErrorChange = (value) => {
    setError(value);
  };


  return (
    <>
    <Navbar/>
    <div className="pink-background flex">
      <div className="logo flex">
        <h1 className="lily-font dark-text l-font">GalVibe</h1>
      </div>
      <div className="btn-container">
          <span onClick={() => setAllUsers(true)} className={allUsers ? "active-btn s-font m-weight white-text" : "btn s-font"}>Explore</span>
          <span onClick={() => setAllUsers(false)} className={!allUsers ? "active-btn s-font m-weight white-text" : "btn s-font"}>Saved gals</span>
        </div>
      <div className="inner-container">

        {allUsers ? (
          <>
            <div className="filter-btn" onClick={() => filter ? setFilter(false) : setFilter(true)}>
              <p className="xs-font">Filter list</p>
              <span><IoFilterCircleOutline className="xs-icon"/></span>
              
            </div>
            {filter && <FilterUserComponent onStateChange={handleStateChange} onErrorChange={handleErrorChange}/>}

            {error && <div className="error-soft">{error}</div>}

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
</>

  );
};

export default Users;