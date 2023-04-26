import { useEffect} from 'react';
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router';

const OneUser = () => {

    const params = useParams();
    const {listUser, dispatch} = useUserContext();
    const {user} = useAuthContext();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)

    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8080/user/${params.id}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        //dispatch({type: 'SET_USER', payload: json});
        console.log("FEED JSON", json);

      }
      if(!res.ok) {
        console.log("res, ", res, "json, ", json)
      }
    }

    if (token) {
      fetchUser();
    }
  }, [dispatch, user]);

    return (
      <div>
        <h1>One user</h1>
        
        <div className="list-of-users">
            {/* {listUser && <OneUser key={listUser._id} user={listUser} />} */}
            
        </div> 
      </div>
        
     
    );
  };
  
  export default OneUser;