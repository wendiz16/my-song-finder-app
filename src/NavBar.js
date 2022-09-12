import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function NavBar({setIsAuth}){
  let navigate = useNavigate();
  const isAuth=localStorage.getItem("isAuth");
  const username = localStorage.getItem("userName"); 
  
  const homeLink=<Link to='/' className="menuItem">Home</Link>;
  const searchLink=<Link to='/Search' className="menuItem">Search</Link>;
  const libraryLink=(isAuth)? <Link to='/Library' className="menuItem">Library</Link>: <Link to='/Login' className="menuItem">Library</Link>;

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
  const loginStatement = <div className="logStat">{(isAuth)? `${username}` :  "Please login"}</div>;
  const loginButton = 
  (isAuth)? <button className="menuItem logBtn" onClick={signOut}>Log out</button> :  <button className="menuItem logBtn"><Link style={{color:"white"}} to='/Login'>Login</Link></button>;
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
             <li>{loginStatement}</li>
              <li>{homeLink}</li>
              <li>{searchLink}</li>
              <li>{libraryLink}</li>
              <li className="loginStatus">{loginButton}</li>
            </ul> 
          </nav>
        </div>
        <div class="menu-bg" id="menu-bg"></div>
      </div>
  )
};

export default NavBar;