import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { Outlet, Link, useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

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
            <header className="d-flex justify-content-between flex-wrap py-3 mb-4 border-bottom">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Inventory</Link>
                </li>
                <li className="nav-item">
                  <Link to="/list" className="nav-link">Shopping List</Link>
                </li>
              </ul>
              <div className="float-end">
                <button className="btn btn-info btn-sm" type="button" onClick={signUserOut}>
                  <Icon.Google /> Sign Out {user.displayName}
                </button>
              </div>
            </header>
          ) : (
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <button className="btn btn-info btn-sm" type="button" onClick={signUserIn}>
                <Icon.Google /> Sign In
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