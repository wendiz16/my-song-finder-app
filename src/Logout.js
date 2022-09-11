import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
function Logout({setIsAuth})
{
  let navigate = useNavigate();
  auth.signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
  });
}

export default Logout;