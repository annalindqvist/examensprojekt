// REACT IMPORTS 
import { useState } from 'react';
import { useNavigate } from 'react-router';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

// IMPORT COMPONENTS
import BackBtnComponent from '../components/GoBackBtnComponent/BackBtnComponent';
import Navbar from '../components/Navbar/Navbar';

const EditProfilePicture = () => {

  const { user, dispatch } = useAuthContext();
  const imageUrl = user.img ? `http://143-42-49-241.ip.linodeusercontent.com:8080/static/${user.img}` : 'http://143-42-49-241.ip.linodeusercontent.com:8080/static/defaultimg.png';
  const [image, setImage] = useState(user.img);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   const handleNavigate = () => {
    navigate('/profile');
  };

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

        const res = await fetch('http://143-42-49-241.ip.linodeusercontent.com:8080/user/edit-profile-image', {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        })
        const json = await res.json();

        if (!res.ok) {
          setError(json.message);
        };
        if (res.ok) {
          // update user in context & local storage
          localStorage.setItem('user', JSON.stringify(json.user));
          dispatch({ type: 'UPDATE_USER', payload: json.user });
          handleNavigate();
        }
      }
      else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <div className="flex pink-background">
      <Navbar/>
      <div className="edit-profile">
        <BackBtnComponent/>
        <h1>Edit profile picture</h1>
        <p className="grey-text m-font">Current picture</p>
        {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="l-edit-profile-img" />}
        <form onSubmit={handleSubmit} encType='multioart/form-data'>
          <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
          {error && <div className="error-soft">{error}</div>}
          <input type="submit" value="Update my profile picture" />
        </form>
      </div>
    </div>
  );
};

export default EditProfilePicture;