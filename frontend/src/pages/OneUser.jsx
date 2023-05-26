// REACT IMPORTS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// IMPORT HOOKS
import { useUserContext } from "../hooks/useUserContext";

// IMPORT COMPONENTS
import SaveUserComponent from "../components/OneUserComponent/SaveUserComponent";
import DescriptionComponent from "../components/OneUserComponent/DescriptionComponent";
import InterestsComponent from "../components/OneUserComponent/InterestsComponent";
import TopOfProfileComponent from "../components/OneUserComponent/TopOfProfileComponent";
import BackBtnComponent from "../components/GoBackBtnComponent/BackBtnComponent";
import Navbar from '../components/Navbar/Navbar';

const OneUser = () => {

  const params = useParams();
  const { selectedUser, dispatch } = useUserContext();
  const [view, setView] = useState('About');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      const res = await fetch(`http://143-42-49-241.ip.linodeusercontent.com:8080/user/${params.id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_SELECTED_USER', payload: json });
      }
    }

    if (token) {
      fetchUser();
    }
  }, [params.id, dispatch]);

  return (
    <>
      <Navbar />
      <div className="pink-background centered-content-column">
        <div className="profile">

          <BackBtnComponent />

          {selectedUser && <TopOfProfileComponent key={selectedUser._id} selectedUser={selectedUser} />}

          <div className="btn-container btn-container-profile">
            <span onClick={() => setView('About')} className={view === 'About' ? "active-btn s-font m-weight white-text" : "btn s-font"}>About</span>
            <span onClick={() => setView('Interests')} className={view === 'Interests' ? "active-btn s-font m-weight white-text" : "btn s-font"}>Interests</span>
            <span onClick={() => setView('Posts')} className={view === 'Posts' ? "active-btn s-font m-weight white-text" : "btn s-font"}>Posts</span>
          </div>

          <div className="info-container-profile">

            {view === 'About' && (
              <>
                {selectedUser && <DescriptionComponent key={selectedUser._id} selectedUser={selectedUser} />}
              </>
            )}
            {view === 'Interests' && (
              <>
                {selectedUser && <InterestsComponent key={selectedUser._id} selectedUser={selectedUser} />}
              </>
            )}
            {view === 'Posts' && (
              <>
                <p>Posts created by this user...</p>
              </>
            )}

          </div>

          <div className="save-user-btn">
            {selectedUser && <SaveUserComponent key={selectedUser._id} selectedUser={selectedUser} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default OneUser;