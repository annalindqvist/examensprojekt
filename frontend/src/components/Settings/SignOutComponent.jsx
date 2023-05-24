// IMPORT HOOKS
import { useSignout } from '../../hooks/useSignoutContext';

// IMPORT ICON
import { CgLogOut } from 'react-icons/cg';

const SignOutComponent = () => {

    const { signout } = useSignout();
    const handleClick = () => {
        signout();
    };


    return (

        <div className="settings-container settings-last-container">
            <p className="m-font grey-text">Sign out</p>
            <button onClick={handleClick} className="settings-btn sign-out-btn"><CgLogOut className="icon"/> <p>Sign out</p></button>
        </div>
    );
}

export default SignOutComponent;