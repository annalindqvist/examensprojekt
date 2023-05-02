// import './ListOfUsers.css';
import { useAuthContext } from "../../hooks/useAuthContext";


const ListOfUsers = ({ user }) => {

    const {dispatch} = useAuthContext();
    const firstname = user.firstname ? user.firstname : "";
    const imageUrl = user.img ? `http://localhost:8080/static/${user.img}` : "";
    const userId = user._id;

    const handleClick = async () => {

      const token = localStorage.getItem('token');
      if (token) {

        const res = await fetch('http://localhost:8080/user/save', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ userId})
              })
        const json = await res.json()
  
        if (res.ok) {
          dispatch({type: 'UPDATE_USER', payload: json})
          console.log("Saved one user", json)
        }
      }
    }

  return (

    <div className="user-card">
      <p>{firstname}</p> 
      {imageUrl && <img src={imageUrl} alt="" width="100" height="100" /> }
      <button onClick={handleClick}>Save</button>
    </div>
    
  )
}

export default ListOfUsers;