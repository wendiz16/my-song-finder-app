import { useState } from 'react';
import {Link} from 'react-router-dom';
function Search(props){
  const [userChoice, setUserChoice] = useState('placeholder');
  const handleUserChoice = (e) => {
    setUserChoice(e.target.value);
  }


  return(
      <section id='search' className='search'>
        <Link to="/"><i class="fas fa-angle-double-left fa-2x">Back</i></Link>
        <h2>Let's find top songs in some countries!</h2>
        <form onSubmit={(e) => props.getCountries(e, userChoice)}>
          <select value={userChoice}
          onChange={handleUserChoice} name="countries" id="countries">
            <option value="placeholder" disabled>Pick Country here:</option>
            <option value="au">Australia</option>
            <option value="br">Brazil</option>
            <option value="ca">Canada</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
            <option value="in">India</option>
            <option value="it">Italy</option>
            <option value="jp">Japan</option>
            <option value="sg">Singapore</option>
            <option value="za">South Africa</option>
            <option value="uk">UK</option>
            <option value="us">USA</option>
          </select>
          <button type="submit">click me to get songs!</button>
        </form>

    </section>
  
  )
}

export default Search;