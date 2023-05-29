// REACT IMPORTS
import { useState } from 'react';

// HOOKS IMPORTS
import { useAuthContext } from "../../hooks/useAuthContext";

const AuthSettingsComponent = () => {

    const { user, dispatch } = useAuthContext();
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);


    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {

            if (newPassword1 !== newPassword2) {
                return setError("Password doesnt match");
            }

            const res = await fetch('http://localhost:8080/user/auth-settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ email, oldPassword, newPassword1, newPassword2 }),
            })
            const json = await res.json();

            if (!res.ok) {
                setError(json.message);
            }
            if (res.ok) {

                // update user in context & local storage
                localStorage.setItem('user', JSON.stringify(json.user));
                dispatch({ type: 'UPDATE_USER', payload: json.user });
                setMessage("Information updated.");
            }
        }
    }

    return (
        <>
            <div className="settings-container">
                <p className="m-font grey-text">Update login information</p>
                <form onSubmit={handleSubmit} className="settings-form">
                    <p className="m-font">Email</p>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <p className="m-font">Old password</p>
                    <input type="password" name="oldpassword" onChange={(e) => setOldPassword(e.target.value)} placeholder="Old password" />

                    <p className="m-font">New password</p>
                    <input type="password" name="newpassword1" onChange={(e) => setNewPassword1(e.target.value)} placeholder="New password.." />

                    <p className="m-font">And new password again</p>
                    <input type="password" name="newpassword2" onChange={(e) => setNewPassword2(e.target.value)} placeholder="New password again" />
                    {error && <div className="error">{error}</div>}
                    {message && <div className="m-font">{message}</div>}
                    <input className="form-button" type="submit" value="Update information" />

                </form>
            </div>
        </>
    );
}

export default AuthSettingsComponent;