// REACT IMPORTS
import { useEffect }from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORT
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENT IMPORTS
import ListOfUsers from '../components/ListOfUsers/ListOfUsers';

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const Users = () => {

  const {listOfUsers, dispatch} = useUserContext();
  const {user} = useAuthContext();
  
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
        <Link to="/user/saved">Saved</Link>
        <div className="list-of-users">
            {listOfUsers && listOfUsers.map((users) => {
              if (users._id !== user._id) {
                return <ListOfUsers key={users._id} user={users} />;
              }
              return null;
            }
            )}
      </div>
      </div>
        
     
    );
  };
  
  export default Users;