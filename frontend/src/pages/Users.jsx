import { useEffect }from 'react';
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ListOfUsers from '../components/ListOfUsers/ListOfUsers';

const Users = () => {

  const {listOfUsers, dispatch} = useUserContext();
  const {user} = useAuthContext();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8080/all-users", {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({type: 'SET_USERS', payload: json});
        console.log("Users.jsx json ", json)
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
      <div>
        <h1>All users</h1>
        
        <div className="list-of-users">
            {listOfUsers && listOfUsers.map((users) => (
            <ListOfUsers key={users._id} user={users} />
            ))}
      </div>
      </div>
        
     
    );
  };
  
  export default Users;