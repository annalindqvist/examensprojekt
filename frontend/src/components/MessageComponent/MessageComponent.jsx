const MessageComponent = ({message, myMessage}) => {
    
    const imageUrl = `http://localhost:8080/static/undefined`;

    return ( 
        <div className={myMessage ? "my-message" : ""}>
        <div>
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})`}} alt="profileimage" className="s-profile-img"/> }
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{message.createdAt}</div>
      </div>
     );
}
 
export default MessageComponent;