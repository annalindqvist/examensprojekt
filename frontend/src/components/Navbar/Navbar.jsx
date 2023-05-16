// REACT IMPORTS
import { Link } from 'react-router-dom';

// IMPORT ICONS
import { CgGirl, CgHome } from 'react-icons/cg';
import { BiHomeAlt } from 'react-icons/bi';
import { IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { IoMdNotificationsOutline } from 'react-icons/io';

// IMPORT HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';

// IMPORT CSS
import "./Navbar.css"

const Navbar = () => {

  const { user } = useAuthContext();

  return (
      <>
      {user && (
        <div className="menu">
            <nav>
                <Link to="/">
                  <span className="centered-content-column">
                    <BiHomeAlt />
                    <p className="xs-font">Feed</p>
                  </span>
                  </Link>
                <Link to="/profile">
                    <span className="centered-content-column">
                      <CgGirl />
                      <p className="xs-font">Profile</p>
                    </span>
                </Link>
                <Link to="/users">
                <span className="centered-content-column">
                      <IoPeopleOutline />
                      <p className="xs-font">Explore</p>
                    </span>
                 
                  </Link>
                
                <Link to="/chat">
                   <span className="centered-content-column">
                      <HiOutlineChatBubbleOvalLeftEllipsis />
                      <p className="xs-font">Chat</p>
                    </span>
                </Link>
                <Link to="/">
                   <span className="centered-content-column">
                      <IoMdNotificationsOutline />
                      <p className="xs-font">Notifications</p>
                    </span>
                </Link>
                
            </nav>
          
        </div> 
      )}
      </>
  )
}

export default Navbar;