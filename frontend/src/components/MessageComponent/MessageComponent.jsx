import {  formatDistanceToNow } from 'date-fns';


const MessageComponent = ({message, myMessage}) => {
    
    const imageUrl = `http://localhost:8080/static/undefined`;

    return ( 
        <div>
        <div className={myMessage ? "my-message message-content" : "message-content"}>
          <p className="s-font">{message.text}</p>
        </div>
        <div className="message-time xs-font">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</div>
      </div>
     );
}
 
export default MessageComponent;