
const InterestsComponent = ({ selectedUser }) => {

    const intrests = selectedUser.intrests ? selectedUser.intrests : null;
    console.log(selectedUser)

  return (

    <div className="info-content-container m-font">
     {intrests?.map((interest) => <p>{interest}</p>)}
    </div>
    
  )
}

export default InterestsComponent;