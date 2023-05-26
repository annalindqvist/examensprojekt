// IMPORT REACT
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// IMPORT HOOKS
import {useSignup} from "../../hooks/useSignupContext";

// JSON IMPORT
import citiesData from "../../json/cities.json";

const SignupComponent = () => {
    
    const {signup, error: signupError} = useSignup();
    const [cities, setCities] = useState([]);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [terms, setTerms] = useState(false); 
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setCities(citiesData.towns);
      }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
      
        if(!firstname || !lastname || !age || !city || !email) {
            return setError("Please fill in all the fields.")
        }

        if (!terms) {
            return setError("You need to read and agree to terms and conditions to sign up.");
        }

        if (password1 < 8 || password1 > 72) {
            return setError("Password must be min 8 and max 72 characters.");
        }

        if (password1 !== password2) {
            return setError("Password doesnt match, try again.");
        }
        signup(email, firstname, lastname, age, city, password1, password2, terms );
    }


    return ( 
        <>
            <div className="flex">
                <h1 className="lily-font l-font mediumpink-text" >Sign up to GalVibe!</h1>
                <h2 className="white-text s-font m-weight">The place to connect with new gals!</h2>
            </div>
            <form onSubmit={handleSubmit} className="centered-content-column">
                 <input type="text" name="firstname" onChange={(e) => setFirstname(e.target.value)} placeholder="Your firstname"/>
                <input type="text" name="lastname" onChange={(e) => setLastname(e.target.value)} placeholder="Your lastname"/>
                <input type="number" name="age" onChange={(e) => setAge(e.target.value)} placeholder="Your age"/>
                <div className="custom-select-container" style={{width:"100%"}}>
                    <select className="custom-select"  name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))} 
                    </select>
                </div>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your email"/>
                <input type="password" name="password" onChange={(e) => setPassword1(e.target.value)} placeholder="Choose a password.."/>
                <input type="password" name="password" onChange={(e) => setPassword2(e.target.value)} placeholder="And your chosen password again"/>
                <div className="terms-flex">
                    <input type="checkbox" name="terms" id="terms" onChange={(e) => setTerms(e.target.checked)}/>
                    <Link to="/terms-and-conditions" className="s-font white-text">I have read and agree to GalVibes terms!</Link>
                </div>
                {signupError && <div className="error">{signupError}</div>}
                {error && <div className="error">{error}</div>}
                <input type="submit" value="Sign up!" />
            </form>
            <p className="s-font mediumpink-text">Already a member of GalVibe? <Link to="/signin" className="white-text">Sign in!</Link></p>
        </>
     );
}

export default SignupComponent;