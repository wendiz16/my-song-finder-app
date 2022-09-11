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

  const menuOnClick=()=>{
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }
  
  const signOut = () =>{
    auth.signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    });
  }
  //let signOutButton = (isAuth)? <button onClick={signOut}>Log out</button>:"";
  const loginStatement = 
  (isAuth)? <button onClick={signOut}>Log out</button> :  <Link to='/Login'>Login</Link>;
  
  return (

      <div className="navBarContainer">
        <div id="menu">
          <div id="menu-bar" onClick={()=>menuOnClick()}>
            <div id="bar1" class="bar"></div>
           <div id="bar2" class="bar"></div>
            <div id="bar3" class="bar"></div>
          </div>
          <nav className="nav" id="nav">
            <ul>
              <li>{homeLink}</li>
              <li>{searchLink}</li>
              <li>{libraryLink}</li>
              <li className="loginStatus">{loginStatement}</li>
            </ul> 
          </nav>
        </div>
        <div class="menu-bg" id="menu-bg"></div>
      </div>
  )
};

export default NavBar;