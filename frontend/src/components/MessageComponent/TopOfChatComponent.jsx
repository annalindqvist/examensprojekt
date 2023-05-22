import { Link } from "react-router-dom";

const TopOfChatComponent = ({selectedUser}) => {
    
    const imageUrl = `http://localhost:8080/static/undefined`;

    return ( 
        <Link to={`/user/${selectedUser._id}`}>
            <p>Open chat with: {selectedUser.firstname}</p>
        </Link>
     );
}
 
export default TopOfChatComponent;