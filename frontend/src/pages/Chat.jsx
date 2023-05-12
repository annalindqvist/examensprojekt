import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ChatConversationComponent from "../components/ChatConversationComponent/ChatConversationComponent";
import MessageComponent from "../components/MessageComponent/MessageComponent";


const Chat = () => {

    const {user} = useAuthContext();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [previousMessage, setPreviousMessage] = useState(null);
    const socket = useRef();
    console.log("currentChat", currentChat)
    
    useEffect(() => {
        socket.current = io('http://localhost:8080'); // Connect to the Socket.io server
        console.log(socket)
        // Handle connection
        socket.current.on('connect', () => {
          console.log('Connected to Socket.io server.');
        });

        socket.current.on("getMessage", (data) => {
            setPreviousMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    
        // Handle disconnection
        socket.current.on('disconnect', () => {
          console.log('Disconnected from Socket.io server.');
        });
    
        return () => {
          socket.current.disconnect(); // Clean up the socket connection when unmounting the component
        };
      }, []);

      useEffect(() => {
        socket.current.emit("newConnectedUser", user._id);
        
      }, [user]);

      useEffect(() => {
          previousMessage &&
          currentChat?.includes(previousMessage.sender) &&
          setMessages((prev) => [...prev, previousMessage]);
      }, [previousMessage, currentChat]);

      //get previous sent messages from db of this chat
      useEffect(() => {
        const getOldMessages = async () => {
          const token = localStorage.getItem('token');
          try {
            if (token) {

            const members = {reciever: currentChat[0], me: user._id};
            console.log("members", members)
            const res = await fetch('http://localhost:8080/chat/open/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({members})})

            // const res = await fetch('http://localhost:8080/chat/messages/' + currentChat, {
            // method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            // },})
            const json = await res.json();
            console.log("get old messages", json)
            setMessages(json.messages);
            setChatId(json.chat);
          }
          } catch (err) {
            console.log(err);
          }
        };
        getOldMessages();
      }, [currentChat, chatId]);

      //console.log("currentChat", currentChat)
      console.log("chatId", chatId)
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {

            const message = {
            sender: user._id,
            text: newMessage,
            conversationId: chatId,
            };
        
            const receiverId = currentChat.find(
            (chatMember) => chatMember !== user._id
            );
        
            socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
            });
    
            e.preventDefault();
            if (!user) {
                console.log("You must be signed in to post.");
                return;
            }
            const res = await fetch('http://localhost:8080/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message })
            })
            const json = await res.json();


            setMessages([...messages, json]);
            setNewMessage("");
            console.log("messages", messages)
            
            console.log(json)
        
            if (!res.ok) {
                console.log("error")
            };
            if (res.ok) {
                console.log("resok")
            };
        } 
      };
    

    return ( 
        <>
        <h1>Chat</h1>
        {currentChat ? (
            <>
             <div className="chatMessagesContainer">
             {messages?.map((m) => (
               <div>
                 <MessageComponent message={m} myMessage={m.sender === user._id} />
               </div>
             ))}
           </div>
           <div className="chatInputContainer">
             <textarea
               placeholder="Aa.."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}
             ></textarea>
             <button onClick={handleSubmit}>
               Send
             </button>
           </div>
         </>
            ) : (
            user.savedGirls &&
            user.savedGirls.map((girl) => (
                <div onClick={() => setCurrentChat([girl._id])}>
                    <div key={girl._id}>
                        <p>{girl.firstname}</p>
                    </div>
                </div>
            ))
            )}
        </>
     );
}
 
export default Chat;