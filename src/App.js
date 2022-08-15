import{useEffect,useState} from 'react';
import { getDatabase, ref,push,onValue} from 'firebase/database';
import firebase from './firebase';
import axios from 'axios';
import Header from './Header.js';
import Search from './Search.js';
import countryMap from './countryMap.js';
import DisplayResults from './DisplayResults.js';
import ToListenList from './ToListenList.js';
import Footer from'./Footer.js';


function App() {
  
  const [userSelection, setUserSelection]=useState('ca');
  const[trackList,setTrackList]=useState([]);
  const[toListenList, setToListenList]=useState([]);
  // create a reference to our database
  const database = getDatabase(firebase);
  const dbRef = ref(database);
  
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
       alert("Sorry, there is something wrong...");
     }
       );
   
     },[userSelection])

   // create a copy of trackList
   const copyOfTrackList = [...trackList];

   

   // this event will fire whenever the save button is clicked 

  const handleClick =(e)=>{
    console.log(e.target.className);//string 
    copyOfTrackList.forEach(songItem => {
      console.log("songItem id is", typeof(songItem.track.track_id));//number

      if(songItem.track.track_id.toString()===e.target.className){
        console.log("yes");

        const savedSong ={
          id:songItem.track.track_id, 
          name:songItem.track.track_name,
          artist:songItem.track.artist_name,
          lyricLink:songItem.track.track_share_url
        }
  
        push(dbRef, savedSong);
      }
    }
  );
  }

  // get data from datatbase and create a variable to store the data 

  useEffect(()=>{
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      console.log(data);
      for (let key in data) {
        // inside the loop, we push each song item to an array we already created inside the onValue() function called newState
        newState.push({key: key, description: data[key]});
      }
      console.log("newState is ", newState);
      setToListenList(newState);
    })
  },[dbRef])
  

  
  return (
    <div className="App">
      <Header />
      <main id='main'>
        <Search getCountries={getCountries}/>
        <DisplayResults 
        trackList={trackList}
        country={countryMap.get(userSelection)}
        handleClick={handleClick}/>
        <ToListenList toListenList={toListenList}/>
      </main>
      <Footer />
    </div>
    
  );
}

export default App;
