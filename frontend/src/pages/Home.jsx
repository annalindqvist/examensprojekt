// import components
import Signup from '../components/Signup';

// functions
import {getTest} from "../functions/test";
import {useState, useEffect} from "react";
const Home = () => {

    const [data, setData] = useState("Hello World");

    useEffect(() => {
        getTest()
        .then((res)=> {
            setData(res.message);
        })
        .catch((error) => console.log(error))
    }, []);



    return <div>
        <h1>Home</h1>
        <h2>{data}</h2>

        <Signup/>
        
        </div>;
  };
  
  export default Home;