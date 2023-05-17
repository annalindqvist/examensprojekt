// SOCKET IMPORT
import { io } from "socket.io-client";

// REACT IMPORTS
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// IMPORT HOOKS
import { useAuthContext } from "../hooks/useAuthContext";
import { useSocketContext } from "../hooks/useSocketContext";

// IMPORT COMPONENTS
import ChatConversationComponent from "../components/ChatConversationComponent/ChatConversationComponent";
import MessageComponent from "../components/MessageComponent/MessageComponent";

// IMPORT ICONS
import { BsSend } from 'react-icons/bs';

const Chat = () => {

  const { user } = useAuthContext();
  const { dispatch, listOfChats } = useSocketContext();
  const [allChats, setAllChats] = useState(true);

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
                  return (

                    <Link to={`/chat/${member._id}`} key={member._id}>
                      <div>
                        <p>{member.firstname}</p>
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