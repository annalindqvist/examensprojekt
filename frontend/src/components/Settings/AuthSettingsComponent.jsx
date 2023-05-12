// REACT IMPORTS
import { useState} from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { useAuthContext } from "../../hooks/useAuthContext";


const AuthSettingsComponent = () => {

    const {user, dispatch} = useAuthContext();
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("")

    // const {signin, error, isLoading} = useSignin();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {

            if (newPassword1 !==  newPassword2) {
                return console.log("Password doesnt match");
            }

            const res = await fetch('http://localhost:8080user/auth-settings', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ email, oldPassword, newPassword1, newPassword2 }),
            })
            const json = await res.json();

            if (!res.ok) {
            console.log("error", json);
            }
            if (res.ok) {
           
            // update user in context & local storage
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({type: 'UPDATE_USER', payload: json.user});
            }
        }
        
    }

    return ( 
        <>
            <p>Login information</p>
            <form onSubmit={handleSubmit} className="centered-content-column">
                <p>Email</p>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                <p>Old password</p>
                <input type="password" name="oldpassword" onChange={(e) => setOldPassword(e.target.value)} placeholder="Old password"/>
               
                <p>New password</p>
                <input type="password" name="newpassword1" onChange={(e) => setNewPassword1(e.target.value)} placeholder="New password.."/>
               
                <p>And new password again</p>
                <input type="password" name="newpassword2" onChange={(e) => setNewPassword2(e.target.value)} placeholder="New password again"/>
               
                <input className="form-button" type="submit" value="Update information" />
               
            </form>
        </>
     );
}
 
export default AuthSettingsComponent;