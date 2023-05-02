import { Link } from 'react-router-dom';
import { useSignout } from '../../hooks/useSignoutContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const { signout } = useSignout();
  const { user } = useAuthContext();

  const handleClick = () => {
    signout();
  };

  return (
    
      <div className="menu">
        <nav>
          {user && (
            <div>
                <div>
                    <span>{user.firstname}</span>
                    <button onClick={handleClick}>Sign out</button>
                </div>
                <div>
                    <Link to="/">Feed</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/users">All users</Link>
                    <Link to="/user/saved">Saved</Link>
                </div>
            </div>
          )}
        </nav>
      </div>
      
  )
}

export default Navbar;