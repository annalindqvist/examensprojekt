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
    <header>
      <div className="container">
        <nav>
          {user && (
            <div>
                <div>
                    <span>{user.firstname}</span>
                    <button onClick={handleClick}>Sign out</button>
                </div>
                <div>
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Feed</Link>
                </div>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/home">Signin</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar;