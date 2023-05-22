// REACT IMPORTS
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// IMPORT ICONS
import { CgGirl, CgHome } from 'react-icons/cg';
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
  const { socket, dispatch, chatNotifications: socketChatNotifications } = useSocketContext();
  const [chatNotification, setChatNotification] = useState([]);

  
  useEffect(() => {
    // Listen for the "newChatNotification" event
    console.log("socket navbar")
    if (socket) {
      socket.on("newChatNotification", (notification) => {
        console.log("notification", notification)
        // Update the chat notifications state
        dispatch({ type: 'SET_CHAT_NOTIFICATIONS', payload: notification });
        setChatNotification((prev) => [...prev, notification])
      });

      return () => {
        // Clean up the event listener when component unmounts
        socket.off("newChatNotification");
      };
    }
  }, [socket, dispatch]);

  socket?.on("newChatNotification", (notification) => {
    console.log("notification", notification)
    // Update the chat notifications state
    dispatch({ type: 'SET_CHAT_NOTIFICATIONS', payload: notification });
    
  });


  useEffect(() => {
    console.log("socketchatnot", socketChatNotifications)
    setChatNotification(socketChatNotifications)
    
  }, [socketChatNotifications]);

  console.log("CHATNOT", chatNotification)

  return (
    <>
      {user && (
        <div className="menu">
          <nav>
            <Link to="/">
              <span className="centered-content-column">
                <BiHomeAlt className='icon'/>
                <p className="xs-font">Feed</p>
              </span>
            </Link>
            <Link to="/profile">
              <span className="centered-content-column">
                <CgGirl className='icon'/>
                <p className="xs-font">Profile</p>
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