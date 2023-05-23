import { useAuthContext } from "../../hooks/useAuthContext";

const DescriptionComponent = ({ selectedUser }) => {

  const {user} = useAuthContext();
    const description = user.description ? user.description : null;
    console.log(selectedUser)

  return (

    <div className="info-content-container m-font">
      <p>{description}</p>   
    </div>
    
  )
}

export default DescriptionComponent;