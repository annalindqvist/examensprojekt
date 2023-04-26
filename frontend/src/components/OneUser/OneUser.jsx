import './ListOfUsers.css';

const ListOfUsers = ({ user }) => {

//   const firstname = user.firstname ? user.firstname : "";
//   const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : "";
    console.log(user)
  return (
    <div className="user-card">
        {/* <p>One user card</p> */}
      {/* <p>{firstname}</p>  */}
      {/* {imageUrl && <img src={imageUrl} alt="" width="100" height="100" /> } */}
    </div>
  )
}

export default ListOfUsers;