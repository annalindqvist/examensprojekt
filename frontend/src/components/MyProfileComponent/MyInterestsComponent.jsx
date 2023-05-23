// IMPORT HOOKS
import { useAuthContext } from "../../hooks/useAuthContext";

const InterestsComponent = ({ selectedUser }) => {

  const {user} = useAuthContext();
    const intrests = user.intrests ? user.intrests : null;
    console.log(user)

  return (

    <div className="info-content-container m-font">
     {intrests?.map((interest) => <p>{interest}</p>)}
    </div>
    
  )
}

export default InterestsComponent;