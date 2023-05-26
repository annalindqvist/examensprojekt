import { useAuthContext } from "../../hooks/useAuthContext";

const DescriptionComponent = () => {

  const { user } = useAuthContext();
  const description = user.description ? user.description : null;

  return (

    <div className="info-content-container m-font">
      <p>{description}</p>
    </div>

  )
}

export default DescriptionComponent;