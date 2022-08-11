import { useState } from 'react';
function Search(props){
  const [userChoice, setUserChoice] = useState('placeholder');
  const handleUserChoice = (e) => {
    setUserChoice(e.target.value);
  }


  return(
    <section id='search' className='search'>
      <h2>Let's find out top songs in some countries!</h2>
      <form onSubmit={(e) => props.getCountries(e, userChoice)}>
        <select value={userChoice}
        onChange={handleUserChoice} name="countries" id="countries">
          <option value="placeholder" disabled>Pick Country here:</option>
          <option value="ca">Canada</option>
          <option value="us">USA</option>
          <option value="uk">UK</option>
          <option value="it">Italy</option>
          <option value="fr">France</option>
          <option value="sg">Singapore</option>
          <option value="ge">Germany</option>
          <option value="ja">Japan</option>
          <option value="in">India</option>
          

        </select>
        <button type="submit">Give me songs!</button>
      </form>

    </section>
  )
}

export default Search;