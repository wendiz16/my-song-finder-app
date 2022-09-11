import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function NavBar({setIsAuth}){
  let navigate = useNavigate();
  const isAuth=localStorage.getItem("isAuth");
  const username = localStorage.getItem("userName"); 
  
  const homeLink=<Link to='/'>Home</Link>;
  const searchLink=<Link to='/Search'>Search</Link>;
  const libraryLink=(isAuth)? <Link to='/Library'>Library</Link>: <Link to='/Login'>Library</Link>;

  const signOut = () =>{
    auth.signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    });
  }
  let signOutButton = (isAuth)? <button onClick={signOut}>Sign Out</button>:"";
  const loginStatement = 
  (isAuth)? `Logged in as ${username}` :  <Link to='/Login'>LogIn</Link>;
  return (
    <div className="navBarContainer">
      <div className="loginStatus">{loginStatement}</div>
      <div >{homeLink}</div>
      <div >{searchLink}</div>
      <div >{libraryLink}</div>
      <div className="loginStatus">{signOutButton}</div>
    </div>
  )
};

export default NavBar