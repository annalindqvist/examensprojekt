// REACT IMPORTS
import { useState } from 'react';

// HOOKS IMPORTS
import { useSignout } from '../../hooks/useSignoutContext';

// IMPORT ICONS
import { HiOutlineTrash } from 'react-icons/hi2';

const AuthSettingsComponent = () => {

    const { signout } = useSignout();
    const [error, setError] = useState(null)
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {

            const res = await fetch('http://143-42-49-241.ip.linodeusercontent.com:8080/user/delete-account', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            })
            const json = await res.json();
            console.log(res)
            if (!res.ok) {
                setError(json);
            }
            if (res.ok) {
                signout();
            }
        }

    }

    return (
        <>
            <div className="settings-container">
                <p className="m-font grey-text">Remove account</p>
                <button onClick={() => setConfirm(true)} className="settings-btn remove-accout-btn"><HiOutlineTrash className="icon"/> <p>Remove account</p></button>

                {confirm && <div className="delete-account-modal">
                    <h1>Delete account</h1>
                    <p>Are you sure you want to delete your account?</p>
                    <div className="modal-btns">
                        <button onClick={() => setConfirm(false)} className="delete-account-modal-btn modal-close">Close</button>
                        <button onClick={handleDelete} className="delete-account-modal-btn">Delete</button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>}
            </div>
        </>
    );
}

export default AuthSettingsComponent;