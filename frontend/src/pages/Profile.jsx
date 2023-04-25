import { useEffect }from 'react';

import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";

const Profile = () => {

    const {onlineUser, dispatch} = useUserContext();
    const {user} = useAuthContext();
    console.log(user);

  //  useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const fetchProfile = async () => {
  //     const res = await fetch("http://localhost:8080/user/info", {
  //       headers: {'Authorization': `Bearer ${token}`},
  //     })
  //     const json = await res.json();
  //     console.log("PROFILE JSON", json);

  //     if (res.ok) {
  //       dispatch({type: 'SET_USER', payload: json});
  //     }
  //   }
  //   if (token) {
  //     fetchProfile();
  //   }
  // }, [dispatch, user]);

  

    return (
      <div>
        <h1>Profile</h1>
        <p>Firstname: {user.firstname}</p>
        <p>Lastname: {user.lastname}</p>
        <p>Email: {user.email}</p>
    </div>
    );
  };
  
  export default Profile;