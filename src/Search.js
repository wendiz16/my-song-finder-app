import { useState } from 'react';
function Search(props){
  // store user's choice in a state 
  const [userChoice, setUserChoice] = useState('placeholder');
  const handleUserChoice = (e) => {
    setUserChoice(e.target.value);
  }


  return(
    <section id='search' className='search'>
      <div className="wrapper">
        <h2>Let's find top songs in some countries!</h2>
        <form onSubmit={(e) => props.getCountries(e, userChoice)}>
          <select value={userChoice}
          onChange={handleUserChoice} name="countries" id="countries">
            <option value="placeholder" disabled>Pick Country here:</option>
            <option value="au">Australia</option>
            <option value="br">Brazil</option>
            <option value="ca">Canada</option>
            <option value="eg">Egypt</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
            <option value="in">India</option>
            <option value="it">Italy</option>
            <option value="jp">Japan</option>
            <option value="sg">Singapore</option>
            <option value="uk">UK</option>
            <option value="us">USA</option>
          </select>
          <button type="submit">click me to get songs!</button>
        </form>
      </div>
    </section>
  )
}

export default Search;