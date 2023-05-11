import { useEffect} from 'react';
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router';

import OneUserComponent from "../components/OneUserComponent/OneUserComponent";

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const OneUser = () => {

    const params = useParams();
    const {selectedUser, dispatch} = useUserContext();
    const {user} = useAuthContext();

    // const URL1 = `http://localhost:8080/user/${params.id}`;
    // const URL2 = "http://localhost:8080/user/${params.id}";
    
  //console.log(env.REACT_APP_API_URL)
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8080/user/${params.id}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await res.json();

      if (res.ok) {
        dispatch({type: 'SET_SELECTED_USER', payload: json});
        console.log("OneUser.jsx json", json);

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
         {selectedUser && <OneUserComponent key={selectedUser._id} selectedUser={selectedUser} />}  
         
        </div> 
      </div>
        
     
    );
  };
  
  export default OneUser;