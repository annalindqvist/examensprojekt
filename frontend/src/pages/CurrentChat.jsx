// IMPORT REACT
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState, useRef } from "react";

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
    const { dispatch, socket } = useSocketContext();
    const { selectedUser, dispatch: userDispatch } = useUserContext();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [previousMessage, setPreviousMessage] = useState(null);
    const [error, setError] = useState(null);

    const effectRan = useRef(false);
    const navigate = useNavigate();

   const handleNavigate = (to) => {
    navigate({to});
  };

    useEffect(() => {

        if (socket) {

            socket.on("getMessage", (message) => {
                setPreviousMessage({
                    senderId: message.senderId,
                    text: message.text,
                    createdAt: Date.now(),
                });
            });

            return () => {
                socket.off(); // Clean up the socket connection when unmounting the component
            };
        }
    }, [socket, setPreviousMessage]);

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
                    handleNavigate('/chat');
                }
            };
            getOldMessages();
            return () => {
                effectRan.current = true;
            }
        }
    },);

    // get the selectedUser information and update context
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/user/${params.id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        const json = await res.json();

        if (res.ok) {
            userDispatch({ type: 'SET_SELECTED_USER', payload: json });
            dispatch({ type: 'DELETE_CHAT_NOTIFICATIONS', payload: json._id });
            setCurrentChat([json]);
        }
        if (!res.ok) {
            handleNavigate('/chat');
        }
    }

    // this useEffect shows the messages in realtime for the reviecer.. 
    // the variable-names is not the best due to lack of understanding,
    // i know the function render the messages in realtime and that the function is needed
    useEffect(() => {
        console.log("useEffect prevcurent", previousMessage, currentChat)
        if (previousMessage && currentChat) {
            const isMessageForCurrentChat = currentChat.some(
                (chatMember) => chatMember._id === previousMessage.senderId
            );
            if (isMessageForCurrentChat) {
                // remove chatnotification is the chat is open
                dispatch({ type: 'DELETE_CHAT_NOTIFICATIONS', payload: previousMessage.senderId });
                setMessages((prevMessages) => [...prevMessages, previousMessage]);
            }
        }
    }, [previousMessage, currentChat, dispatch]);


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
                handleNavigate('/');
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
                setError("Sorry something went wrong");
            };
            if (res.ok) {
                setMessages([...messages, json]);
                setNewMessage("");
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
                    {error && <div className="error-soft">{error}</div>}

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