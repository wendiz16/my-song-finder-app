import{useEffect,useState} from 'react';
import axios from 'axios';
import Header from './Header.js';
import Search from './Search.js';
import countryMap from './countryMap.js';
import DisplayResults from './DisplayResults.js';
import Footer from'./Footer.js';

function App() {
  // store country selection in a state 
  const [userSelection, setUserSelection]=useState('ca');
  // store songs in a state 
  const[trackList,setTrackList]=useState([]);
  
  // create a method to set user's choice for countries:
  const getCountries = (e, countries) => {
    e.preventDefault();
    setUserSelection(countries);
  }

  // get API data when userSelection mounts 
  useEffect(
    ()=>{
      
      //get data from API 
      axios({
        url: 'https://shrouded-bayou-34065.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?',
        method: 'GET',
        dataResponse: 'json',
        params: {
        chart_name:'top',
        page:1,
        page_size:10,
        country:userSelection,
        f_has_lyrics:1,
        apikey:'ab14e580cc45631b83cf086ece6a6b2c'

      },
    })

      .then(res=>{
       setTrackList(res.data.message.body.track_list);
       
      })
      .catch(err=>{
       console.log(err);
       alert("Sorry, there is something wrong");
     }
       );
   
     },[userSelection])

  
    
  
  return (
    <div className="app">
      <Header />
      <main id='main'>
        <Search getCountries={getCountries}/>
        <DisplayResults 
        trackList={trackList}
        country={countryMap.get(userSelection)}/>
      </main>
      <Footer />
    </div>
    
  );
}

export default App;
