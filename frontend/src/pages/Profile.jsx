import { useEffect, useState }from 'react';

import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";

const Profile = () => {

    const {onlineUser, dispatch} = useUserContext();
    const {user} = useAuthContext();

    
    console.log("user in profile", user)
    console.log("user.img in profile", user.img)
    const imageUrl = `http://localhost:8080/static/${user.img}`;

    const [image, setImage] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault();
      await uploadPhoto(image);
    }  

    const uploadPhoto = async (image) => {
    const token = localStorage.getItem('token');
    console.log("image", image)
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData)

    const res = await fetch('http://localhost:8080/user/edit', {
      method: 'PUT',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData,
    })
    const json = await res.json();

    if (!res.ok) {
      console.log("error", json)
    };
    if (res.ok) {
      // save the user to local storage
      console.log("res.ok", json);
    }
    }
  

    return (
      <div>
        <h1>Profile</h1>
        <p>Firstname: {user.firstname}</p>
        <p>Lastname: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <div>{user.img}</div>
        <img src={imageUrl} alt="" width="100" height="100" />

        <form onSubmit={handleSubmit} encType='multioart/form-data'>
          <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])}/>
          <input type="submit" value="Upload profileimage" />
        </form>
    </div>
    );
  };
  
  export default Profile;