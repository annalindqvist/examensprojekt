// IMPORT REACT
import { useParams } from 'react-router';
import { useEffect, useState, useRef } from "react";
// import { Link } from 'react-router-dom';

// // SOCKET IMPORT
// import { io } from "socket.io-client";

// IMPORT HOOKS
import { useAuthContext } from "../hooks/useAuthContext";
import { useSocketContext } from "../hooks/useSocketContext";
import { useUserContext } from "../hooks/useUserContext";

// IMPORT COMPONENTS
import MessageComponent from "../components/MessageComponent/MessageComponent";
import TopOfChatComponent from "../components/MessageComponent/TopOfChatComponent";

// IMPORT ICONS
import { BsSend } from 'react-icons/bs';

const CurrentChat = () => {

    const params = useParams();
    const { user } = useAuthContext();
    const { dispatch, selectedChat, socket, chatNotifications } = useSocketContext();
    const { selectedUser, dispatch: userDispatch } = useUserContext();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [previousMessage, setPreviousMessage] = useState(null);
    // const socket = useRef();
    const effectRan = useRef(false);

    useEffect(() => {

        // // Connect to the Socket.io server
        // socket.current = io('http://localhost:8080');
        // //console.log(socket)
        // // Handle connection
        // socket.current.on('connect', () => {
        //     console.log('Connected to Socket.io server.');
        // });

        if (socket) {

            socket.on("getMessage", (message) => {
                console.log("getMessage current on", message)
                setPreviousMessage({
                    senderId: message.senderId,
                    text: message.text,
                    createdAt: Date.now(),
                });
                console.log("previousmessage getmessage", previousMessage)
            });

            return () => {
                socket.off(); // Clean up the socket connection when unmounting the component
            };
        }
    }, [socket, setPreviousMessage]);

    // useEffect(() => {
    //     // Listen for the "newChatNotification" event

    //     if(socket) {


    //     socket.on("newChatNotification", (notification) => {
    //         console.log("notification", notification)
    //         // Update the chat notifications state
    //       dispatch({ type: 'SET_CHAT_NOTIFICATIONS', payload: notification });
    //     });

    //     return () => {
    //       // Clean up the event listener when component unmounts
    //       socket.off("newChatNotification");
    //     };
    // }
    //   }, [socket, dispatch]);

    // useEffect(() => {
    //     socket.current.emit("newConnectedUser", user._id);

    // }, [user]);

    //create chat if there is no one
    // get previous sent messages
    // effectRan to only run once
    useEffect(() => {
        if (effectRan.current === false) {

            const getOldMessages = async () => {
                const token = localStorage.getItem('token');
                try {
                    if (token) {

                        const members = { reciever: params.id, me: user._id };

                        const res = await fetch('http://localhost:8080/chat/open/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ members })
                        })

                        const json = await res.json();
                        fetchUser();

                        dispatch({ type: 'SET_SELECTED_CHAT', payload: json });
                        
                        setMessages(json.messages);
                        setChatId(json.chat);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            getOldMessages();
            return () => {
                effectRan.current = true;
            }
        }
    }, []);

    // get the selectedUser information and update context
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/user/${params.id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        const json = await res.json();
        //console.log(json)

        if (res.ok) {
            userDispatch({ type: 'SET_SELECTED_USER', payload: json });
            dispatch({ type: 'DELETE_CHAT_NOTIFICATIONS', payload: json._id });

            setCurrentChat([json]);

        }
        if (!res.ok) {
            console.log("res, ", res, "json, ", json)
        }
    }




    // this useEffect shows the messages in realtime for the reviecer.. 
    // --- How and how to rename..? 
    useEffect(() => {
        console.log("useEffect prevcurent", previousMessage, currentChat)
        if (previousMessage && currentChat) {
            const isMessageForCurrentChat = currentChat.some(
                (chatMember) => chatMember._id === previousMessage.senderId
            );
            if (isMessageForCurrentChat) {
                console.log("before ismessageforcurrentchat", messages)
                setMessages((prevMessages) => [...prevMessages, previousMessage]);
                console.log("AFTER ismessageforcurrentchat", messages)
            }
        }
    }, [previousMessage, currentChat]);


    // send messages to db, socket and show for sender without refreshing page
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        if (token && newMessage.length > 0) {
            const message = {
                senderId: user._id,
                text: newMessage,
                conversationId: chatId,
            };

            const receiverId = selectedUser._id;

            socket.emit("sendMessage", {
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

            if (!res.ok) {
                console.log("error")
            };
            if (res.ok) {
                console.log("resok")
            };
        }
    };


    return (
        <div className="pink-background flex">
            <div className="open-chat">
                <div className="chat-info">
                    {selectedUser && <TopOfChatComponent key={selectedUser._id} selectedUser={selectedUser} />}
                </div>
                <div className="chat-messages-container">
                    {messages?.map((m) => (
                        <MessageComponent message={m} myMessage={m.senderId?._id === user._id} />
                    ))}
                </div>
                <div className="chat-input-container">
                    <textarea id="chat-input"
                        placeholder="Aa.."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    ></textarea>
                    <span onClick={handleSubmit} className="send"><BsSend /></span>
                </div>
            </div>
        </div>
    );
}

export default CurrentChat;