import{useEffect,useState} from 'react';
import axios from 'axios';
import Header from './Header.js';
import Search from './Search.js';
import DisplayResults from './DisplayResults.js';
import Footer from'./Footer.js';

function App() {
  
  const [userSelection, setUserSelection]=useState('ca');
  const[trackList,setTrackList]=useState([]);
  
  // Define country parameter:
  const getCountries = (e, countries) => {
    e.preventDefault();
    console.log('getting country', countries);
    setUserSelection(countries);
  }


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
        apikey:'bb5df0cd53ff7e0ab07a9b17e5a6fb30'

      },
    })

      .then(res=>{
       console.log(res.data.message.body.track_list);
       setTrackList(res.data.message.body.track_list);
      })
      .catch(err=>{
       console.log(err);
       alert(err);
     }
       );
   
     },[userSelection])

  
    const countryMap = new Map();
    countryMap.set("placeholder","Canada");
    countryMap.set("ca","Canada");
    countryMap.set("us","USA");
    countryMap.set("uk","UK");
    countryMap.set("it","Italy");
    countryMap.set("fr","France");
    countryMap.set("sg","Singapore");
    countryMap.set("ge","Germany");
    countryMap.set("ja","Japan");
    countryMap.set("in","India");
    countryMap.set("au","Australia");
  
  return (
    <div className="App">
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
