import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }
  const signUserOut = () => {
    signOut(auth);
    navigate('/');
  }
  return (
    <>
      <div className="container">
        {
          user ? (
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Inventory</Link>
                </li>
                <li className="nav-item">
                  <Link to="/list" className="nav-link">Shopping List</Link>
                </li>
              </ul>
              <button className="btn btn-link" type="button" onClick={signUserOut}>
                Sign Out {user.displayName}
              </button>
            </header>
          ) : (
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <button className="btn btn-link" type="button" onClick={signUserIn}>
                Sign In with Google
              </button>
            </header>
          )
        }
      </div>
      <Outlet />
    </>
  )
};

export default Header;