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
    
      <div className="menu">
        <p>test</p>
          {user && (
            <nav>
                <Link to="/">Feed</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/users">All users</Link>
                <Link to="/user/saved">Saved</Link>
                <button onClick={handleClick}>Sign out</button>
            </nav>
          )}
      </div> 
  )
}

export default Navbar;