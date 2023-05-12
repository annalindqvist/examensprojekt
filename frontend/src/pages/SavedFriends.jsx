// REACT IMPORTS
import { useAuthContext } from "../hooks/useAuthContext";

// COMPONENTS
import SavedFriendsComponent from "../components/SavedFriends/SavedFriendsComponent";

const SavedFriends = () => {

    const {user} = useAuthContext();
    console.log("user", user)
   
    return (
      <div>
        <h1>Your saved girls</h1>
          {user.savedGirls && user.savedGirls.map((girl) => (
             <SavedFriendsComponent key={girl._id} girl={girl} />
          ))}
    </div>
    );
  };
  
  export default SavedFriends;