import { useEffect, useState }from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {

    const {user} = useAuthContext();

    console.log("user in profile", user)
    console.log("user.img in profile", user.img)
    const imageUrl = `http://localhost:8080/static/${user.img}`;

    return (
      <div>
        <h1>Your profile</h1>
        <img src={imageUrl} alt="" width="100" height="100" />
        <p>Firstname: {user.firstname}</p>
        <p>Lastname: {user.lastname}</p>
        <p>Age: {user.age}</p>
        <p>Your decription</p>
        <div>{user.description}</div>
    </div>
    );
  };
  
  export default Profile;