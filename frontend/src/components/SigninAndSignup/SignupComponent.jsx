// imports
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useSignup} from "../../hooks/useSignupContext";

import './SigninSignup.css';

const SignupComponent = () => {
    
    const {signup, error, isLoading} = useSignup();

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("firstname: ", {firstname});
        // console.log("lastname: ", {lastname});
        // console.log("password: ", {password});

        if (password1 !== password2) {
            return console.log("password doesnt match");
        }
        // age, city
        signup(email, firstname, lastname, password1, password2);
    }

    const cities = ["Alingsås", "Arboga", "Eskilstuna", "Enköping", "Fagersta", "Falun", "Göteborg", "Gävle", "Katrineholm", "Örebro"];


    return ( 
        <>
            <div className="flex">
                <h1 className="lily-font l-font mediumpink-text" >Sign up to GalVibe!</h1>
                <h2 className="white-text s-font m-weight">The place to connect with new gals!</h2>
            </div>
            <form onSubmit={handleSubmit} className="centered-content-column">
                 {/* <label>Firstname</label> */}
                 <input type="text" name="firstname" onChange={(e) => setFirstname(e.target.value)} placeholder="Your firstname"/>
                {/* <label>Lastname</label> */}
                <input type="text" name="lastname" onChange={(e) => setLastname(e.target.value)} placeholder="Your lastname"/>
                <input type="number" name="age" onChange={(e) => setAge(e.target.value)} placeholder="Your age"/>
                {/* <label>Email</label> */}
                <div className="custom-select-container" style={{width:"100%"}}>
                    <select className="custom-select"  name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))} 
                    </select>
                </div>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email"/>
                {/* <label>Password</label> */}
                <input type="password" name="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Choose a password.."/>
                <input type="password" name="password" onChange={(e) => setPassword2(e.target.value)} placeholder="And your chosen password again"/>
                <div className="terms-flex">
                    <input type="checkbox" name="terms" id="terms" />
                    <Link to="/terms-and-conditions" className="s-font">I have read and agree to GalVibes terms!</Link>
                </div>
                <input type="submit" value="Sign up!" />
            </form>
            <p className="s-font mediumpink-text">Already a member of GalVibe? <Link to="/signin" className="white-text">Sign in!</Link></p>
        </>
     );
}
 
export default SignupComponent;