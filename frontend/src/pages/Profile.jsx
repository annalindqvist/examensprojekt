// REACT IMPORTS
import { useState } from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

// IMPORT COMPONENTS
import MyDescriptionComponent from "../components/MyProfileComponent/MyDescriptionComponent";
import MyInterestsComponent from "../components/MyProfileComponent/MyInterestsComponent";
import MyTopOfProfileComponent from "../components/MyProfileComponent/MyTopOfProfileComponent";

// ICON IMPORTS
import { IoSettingsOutline } from 'react-icons/io5';
import { BsCamera } from 'react-icons/bs';
import Navbar from '../components/Navbar/Navbar';

const Profile = () => {

  const { user } = useAuthContext();
  const [view, setView] = useState('About');

  return (
    <>
      <Navbar />
      <div className="pink-background centered-content-column">
        <div className="profile">

          <div className="profile-top-btns">
            <Link to="/user/edit-profile-picture"><BsCamera className="icon" /></Link>
            <Link to="/user/settings" ><IoSettingsOutline className="icon" /></Link>
          </div>

          {user && <MyTopOfProfileComponent key={user.id} user={user} />}

          <div className="btn-container btn-container-profile">
            <span onClick={() => setView('About')} className={view === 'About' ? "active-btn s-font m-weight white-text" : "btn s-font"}>About</span>
            <span onClick={() => setView('Interests')} className={view === 'Interests' ? "active-btn s-font m-weight white-text" : "btn s-font"}>Interests</span>
            <span onClick={() => setView('Posts')} className={view === 'Posts' ? "active-btn s-font m-weight white-text" : "btn s-font"}>Posts</span>
          </div>

          <div className="info-container-profile my-profile">

            {view === 'About' && (
              <>
                {user && <MyDescriptionComponent key={user._id} user={user} />}
              </>
            )}
            {view === 'Interests' && (
              <>
                {user && <MyInterestsComponent key={user._id} user={user} />}
              </>
            )}
            {view === 'Posts' && (
              <>
                <p>Posts created by this user...</p>
              </>
            )}

          </div>
          <Link to="/user/edit" className="my-profile-edit">Edit profile information</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;