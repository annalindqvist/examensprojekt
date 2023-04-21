// imports
import {useState} from 'react';
import {signup} from "../functions/test";

import './Signup.css';

const Signup = () => {

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("firstname: ", {firstname});
        // console.log("lastname: ", {lastname});
        // console.log("password: ", {password});
        
        const user = {email, firstname, lastname, password};
        signup(user);
                
    }

    return ( 
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label>Firstname</label>
                <input type="text" name="firstname" onChange={(e) => setFirstname(e.target.value)} />
                <label>Lastname</label>
                <input type="text" name="lastname" onChange={(e) => setLastname(e.target.value)} />
                <label>Password</label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
     );
}
 
export default Signup;