// imports
import { useState} from 'react';
import { Link } from 'react-router-dom';
//import {signin} from "../functions/test";

import { useSignin } from "../../hooks/useSigninContext";
import './SigninSignup.css';

const SigninComponent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signin, error, isLoading} = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(email, password);
    }

    return ( 
        <>
            <div className="flex margin-top">
                <h1 className="lily-font xl-font">GalVibe</h1>
                <h2 className="dark-text s-font m-weight">The place to connect with new gals!</h2>
            </div>
            <form onSubmit={handleSubmit} className="centered-content-column">
                {/* <label>Email</label> */}
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                {/* <label>Password</label> */}
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
               
                <input className="form-button" disabled={isLoading} type="submit" value="Sign in!" />
                {error && <div className="error">{error}</div>}
            </form>
            <div className="flex">
                <p className="s-font">Not a member of GalVibe yet? <Link to="/signup" className="mediumpink-text">Sign up!</Link></p>
                <p className="xs-font">Forgot password?</p>
            </div>
        </>
     );
}
 
export default SigninComponent;