// SOCKET IMPORT
import { io } from "socket.io-client";

// REACT IMPORTS
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// IMPORT HOOKS
import { useAuthContext } from "../hooks/useAuthContext";
import { useSocketContext } from "../hooks/useSocketContext";

// IMPORT ICONS
import { BsSend } from 'react-icons/bs';

const Chat = () => {

  const { user } = useAuthContext();
  const { dispatch, listOfChats, socket, chatNotifications: socketChatNotifictions } = useSocketContext();
  const [allChats, setAllChats] = useState(true);
  const [chatNotification, setChatNotifiction] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchChats = async () => {
      const res = await fetch(`http://localhost:8080/chat`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const json = await res.json();

      console.log("json", json)
      console.log("user", user.savedGirls)

      if (res.ok) {
        dispatch({ type: 'SET_CHATS', payload: json });
      }
      if (!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchChats();
    }
  }, [dispatch, user]);


  useEffect(() => {

    setChatNotifiction(socketChatNotifictions)

  }, [socketChatNotifictions]);
  console.log("chat chat not", chatNotification)

  return (
    <div className="white-background">
      <div className="logo flex">
        <h1 className="lily-font dark-text l-font">GalVibe</h1>
        <h2 className="dark-text xs-font">The place to connect with new gals!</h2>
      </div>


      <button onClick={() => setAllChats(true)}>Chats</button>
      <button onClick={() => setAllChats(false)}>Saved</button>


      {allChats ? (
        <>
          {/* PREVIOUS CHATS */}
          <h1>Chats</h1>
          {listOfChats &&
            listOfChats.map((chat) =>
              chat.members.map((member) => {
                if (member._id !== user._id) {
                  const newChat = chatNotification.some(
                    (notification) => notification.senderId === member._id
                  );
                  return (
                    <Link to={`/chat/${member._id}`} key={member._id}>
                      
                      <div>
                        <p className="notification-parent-list">{member.firstname}{newChat && <span className="notification-indicator-list"></span>}</p>
                      </div>
                    </Link>
                  );
                }
                return null;
              })
            )}
        </>
      ) : (
        <>
          <h1>Saved</h1>
          {/* ALL SAVED */}
          {user.savedGirls &&
            user.savedGirls.map((girl) => (
              <Link to={`/chat/${girl._id}`} key={girl._id}>
                <div>
                  <p>{girl.firstname}</p>
                </div>
              </Link>
            ))}
        </>
      )
      }

    </div>

  );
}

export default Chat;