// REACT IMPORTS
import { Link } from 'react-router-dom';

// IMPORT HOOKS
import { useSignout } from '../../hooks/useSignoutContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// IMPORT CSS
import "./Navbar.css"

const Navbar = () => {
  const { signout } = useSignout();
  const { user } = useAuthContext();

  const handleClick = () => {
    signout();
  };

  return (
    
      <>
      {user && (
        <div className="menu">
            <nav>
                <Link to="/">Feed</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/users">All users</Link>
                <Link to="/user/saved">Saved</Link>
                <Link to="/chat">Chat</Link>
                <button onClick={handleClick}>Sign out</button>
            </nav>
          
        </div> 
      )}
      </>
  )
}

export default Navbar;