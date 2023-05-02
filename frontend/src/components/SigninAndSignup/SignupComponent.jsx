// imports
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {signup} from "../../functions/test";

import './SigninSignup.css';

const SignupComponent = () => {

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
        <>
            <div>
                <h1 className="lily-font xl-font" >Sign up to GalVibe!</h1>
                <h2 className="orange-text s-font m-weight">The place to connect with new gals!</h2>
            </div>
            <form onSubmit={handleSubmit} className="centered-content-column">
                 {/* <label>Firstname</label> */}
                 <input type="text" name="firstname" onChange={(e) => setFirstname(e.target.value)} placeholder="Your firstname"/>
                {/* <label>Lastname</label> */}
                <input type="text" name="lastname" onChange={(e) => setLastname(e.target.value)} placeholder="Your lastname"/>
                <input type="number" name="age" id="age"placeholder="Your age" />
                {/* <label>Email</label> */}
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email"/>
                {/* <label>Password</label> */}
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password.."/>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="And your chosen password again"/>
                <div className="terms-flex">
                    <input type="checkbox" name="terms" id="terms" />
                    <Link to="/terms-and-conditions" className="s-font">I have read and agree to GalVibes terms!</Link>
                </div>
                <input type="submit" value="Sign up!" />
            </form>
            <p className="s-font">Already a member of GalVibe? <Link to="/signin" className="orange-text">Sign in!</Link></p>
        </>
     );
}
 
export default SignupComponent;