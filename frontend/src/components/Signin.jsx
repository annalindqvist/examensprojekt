// imports
import { useState } from 'react';
//import {signin} from "../functions/test";

import { useSignin } from "../hooks/useSigninContext";
import './Signup.css';

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signin, error, isLoading} = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(email, password);
    }

    return ( 
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input  disabled={isLoading} type="submit" value="Submit" />
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default Signin;