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
    <div className="pink-background">
      <div className="logo flex">
        <h1 className="lily-font dark-text l-font">GalVibe</h1>
      </div>

      <div className="inner-container">
        <div className="btn-container">
          <span onClick={() => setAllChats(true)} className={allChats ? "active-btn s-font m-weight white-text" : "btn s-font"}>Chats</span>
          <span onClick={() => setAllChats(false)} className={!allChats ? "active-btn s-font m-weight white-text" : "btn s-font"}>Saved gals</span>
        </div>


        {allChats ? (
          <>
            {/* PREVIOUS CHATS */}

            {listOfChats &&
              listOfChats.map((chat) =>
                chat.members.map((member) => {
                  if (member._id !== user._id) {
                    const newChat = chatNotification.some(
                      (notification) => notification.senderId === member._id
                    );
                    const imageUrl = member.img ? `http://localhost:8080/static/${member.img}` : 'http://localhost:8080/static/defaultimg.png';
                    return (
                      <Link to={`/chat/${member._id}`} key={member._id}>

                        <div className="flex-row chat-list">
                          {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
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

            {/* ALL SAVED */}
            {user.savedGirls &&
              user.savedGirls.map((girl) => {
                const imageUrl = girl.img ? `http://localhost:8080/static/${girl.img}` : 'http://localhost:8080/static/defaultimg.png';
                return (
                  <Link to={`/chat/${girl._id}`} key={girl._id}>
                    <div className="flex-row chat-list">
                      {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
                      <div className="flex-column notification-parent-list">
                        <p >{girl.firstname}</p>
                        <div className="time-city">
                          <p className="xs-font grey-text">{girl.age ? girl.age + " | " : ""}{girl.city}</p>
                        </div>
                        
                      </div>

                    </div>
                  </Link>
                )
              })}
          </>
        )
        }
      </div>

    </div>

  );
}

export default Chat;