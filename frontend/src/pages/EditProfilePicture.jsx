// REACT IMPORTS 
import {  useState }from 'react';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const EditProfilePicture = () => {

    const {user, dispatch} = useAuthContext();
    const imageUrl = `http://localhost:8080static/${user.img}`;
    const [image, setImage] = useState(user.img);
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      await editProfilePicture();
    }  

    const editProfilePicture = async () => {

        const token = localStorage.getItem('token');
        // check if signed in
        if (token) {
          // check if image chosen
          if (image) {

            const formData = new FormData();
            formData.append('image', image);
           
            const res = await fetch('http://localhost:8080/user/edit-profile-image', {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`},
            body: formData,
            })
            const json = await res.json();

            if (!res.ok) {
            console.log("error", json)
            };
            if (res.ok) {
           
            // update user in context & local storage
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({type: 'UPDATE_USER', payload: json.user});
            }
          }
          else {
            console.log("no image");
          }
        }
    }  

    return (
      <div>
        <p>Edit profile picture</p>
        {user.img && <p>Current picture</p>,<div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="l-profile-img"/> }
        <form onSubmit={handleSubmit} encType='multioart/form-data'>
           <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])}/> 
          <input type="submit" value="Update my profile picture" />
        </form>
    </div>
    );
  };
  
  export default EditProfilePicture;