import "./ChatConversation.css";
const ChatConversationComponent = ({girl}) => {
    
    return ( 
        <>
            <div className="chat-card">
                <p>{girl.firstname}</p>
            </div>
         </>
     );
}
 
export default ChatConversationComponent;