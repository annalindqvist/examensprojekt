import {  formatDistanceToNow } from 'date-fns';
import {useRef, useEffect} from'react';

const MessageComponent = ({message, myMessage}) => {

    const bottomRef = useRef(null);
  
    //  scroll to bottom every time messages change
    useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [message]);

    return ( 
        <div>
        <div className={myMessage ? "my-message message-content" : "message-content"}>
          <p className="s-font">{message.text}</p>
        </div>
        <div className="message-time xs-font">{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</div>
        <div ref={bottomRef} />
      </div>
     );
}
 
export default MessageComponent;