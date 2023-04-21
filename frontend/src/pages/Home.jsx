// import components
import Signup from '../components/Signup';
import Signin from '../components/Signin';
//import { useAuthContext } from "../hooks/useAuthContext"

// functions
//import {getTest} from "../functions/test";
//import {useState, useEffect} from "react";
const Home = () => {

    //const {user} = useAuthContext()
    //const [data, setData] = useState("Hello World");

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //       const response = await fetch('/api/workouts', {
    //         headers: {'Authorization': `Bearer ${user.token}`},
    //       })
    //       const json = await response.json()
    
    //       if (response.ok) {
    //         console.log(json);
    //       }
    //     }
    
    //     if (user) {
    //       fetchWorkouts()
    //     }
    //   }, [user])



    return <div>
        <h1>Home</h1>
        {/* <h2>{data}</h2> */}

        <Signin/>
        <Signup/>
        
        </div>;
  };
  
  export default Home;