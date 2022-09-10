import { Link } from 'react-router-dom';

function Header(){

  return(
    <header>
      <h1><i class="fas fa-headphones-alt"></i><span>S</span>ongFinder</h1>
      <p className="headerP">Find top 10 songs in different countries </p>
      {/* <a href="#main"><i class="fas fa-chevron-circle-down fa-4x"></i></a> */}
      <Link to='/Search'>
        <i class="fas fa-chevron-circle-down fa-4x"></i>
      </Link>
    </header>
  )
}

export default Header;