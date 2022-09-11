import { Link } from 'react-router-dom';
import NavBar from './NavBar.js';
function Header({setIsAuth}){
  //const isAuth=localStorage.getItem("isAuth");
  //const username = localStorage.getItem("userName"); 
  //const loginStatement = (isAuth)? `Logged in as ${username}` : <Link to='/Login'>LogIn</Link>;
  return(
    <header>
      
      <h1><i class="fas fa-headphones-alt"></i><span>S</span>ongFinder</h1>
      <p className="headerP">Find top 10 songs in different countries </p>
      <Link to='/Search'>
        <i class="fas fa-chevron-circle-down fa-4x"></i>
      </Link>
      <NavBar setIsAuth={setIsAuth} />
    </header>
  )
}

export default Header;