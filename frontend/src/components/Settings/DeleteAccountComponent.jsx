// REACT IMPORTS
import { useState} from 'react';
import { Link } from 'react-router-dom';

// HOOKS IMPORTS
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from '../../hooks/useSignoutContext';

const AuthSettingsComponent = () => {

    const { signout } = useSignout();
    const {user, dispatch} = useAuthContext();
    const [confirm, setConfirm] = useState(false);

    console.log(confirm)
    // const {signin, error, isLoading} = useSignin();

    const handleDelete = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {

            const res = await fetch('http://localhost:8080/user/delete-account', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
            const json = await res.json();
            console.log(res)
            if (!res.ok) {
            console.log("error", json);
            }
            if (res.ok) {
                signout();
            }
        }
        
    }

    return ( 
        <>
            <p>Remove account</p>
            <div>
                <p>Delete my account</p>
                <button onClick={() => setConfirm(true)} className="centered-content-column">Delete</button>
            </div>

            {confirm && <div>
                <p>Are you sure you want to delete your account?</p>
                <button onClick={() => setConfirm(false)} className="centered-content-column">Close</button>
                <button onClick={handleDelete} className="centered-content-column">Delete</button>
            </div>}
        </>
     );
}
 
export default AuthSettingsComponent;