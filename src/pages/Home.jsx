import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Welcome from './Welcome';
import Inventory from './Inventory';

function Home() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? <Inventory /> : <Welcome />}
    </>
  );
}
export default Home;