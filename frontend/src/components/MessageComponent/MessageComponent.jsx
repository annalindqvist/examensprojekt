const MessageComponent = ({message, myMessage}) => {
    
    const imageUrl = `http://143-42-49-241.ip.linodeusercontent.com/static/undefined`;
console.log(myMessage)
    return ( 
        <div>
        <div className={myMessage ? "my-message message-content" : "message-content"}>
          <p className="s-font">{message.text}</p>
        </div>
        <div className="message-time xs-font">{message.createdAt}</div>
      </div>
     );
}
 
export default MessageComponent;