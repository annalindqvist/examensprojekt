const DescriptionComponent = ({ selectedUser }) => {

    const description = selectedUser.description ? selectedUser.description : null;

  return (
    <div className="info-content-container m-font">
      <p>{description}</p>   
    </div>
  )
}

export default DescriptionComponent;