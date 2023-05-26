// REACT IMPORTS
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// IMPORT ICONS
import { CgGirl} from 'react-icons/cg';
import { BiHomeAlt } from 'react-icons/bi';
import { IoPeopleOutline } from 'react-icons/io5';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { IoMdNotificationsOutline } from 'react-icons/io';

// IMPORT HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSocketContext } from '../../hooks/useSocketContext';

// IMPORT CSS
import "./Navbar.css"

const Navbar = () => {

  const { user } = useAuthContext();
  const { chatNotifications: socketChatNotifications } = useSocketContext();
  const [chatNotification, setChatNotification] = useState([]);
  const excludedRoutes = ["/chat/:id"];
  const location = useLocation();
  const showNavBar = user && !excludedRoutes.includes(location.pathname);

  useEffect(() => {
    setChatNotification(socketChatNotifications)
    
  }, [socketChatNotifications]);

  return (
    <>
      {showNavBar && (
        <div className="menu">
          <nav>
            <Link to="/">
              <span className="centered-content-column">
                <BiHomeAlt className='icon'/>
                <p className="xs-font">Feed</p>
              </span>
            </Link>
            <Link to="/users">
              <span className="centered-content-column">
                <IoPeopleOutline className='icon'/>
                <p className="xs-font">Explore</p>
              </span>

            </Link>
            <Link to="/chat">
              <span className="centered-content-column notification-parent">
                {chatNotification.length > 0 ? <span className="notification-indicator"></span> : ""}
                <HiOutlineChatBubbleOvalLeftEllipsis className='icon'/>
                <p className="xs-font">Chat</p>
              </span>
            </Link>
            <Link to="/profile">
              <span className="centered-content-column">
                <CgGirl className='icon'/>
                <p className="xs-font">Profile</p>
              </span>
            </Link>
            <Link to="/notifications">
              <span className="centered-content-column">
                <IoMdNotificationsOutline className='icon'/>
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