import{useEffect,useState} from 'react';
import { getDatabase, ref,push,onValue} from 'firebase/database';
import firebase from './firebase';
import axios from 'axios';
import Search from './Search.js';
import countryMap from './countryMap.js';
import placeholderList from './placeholderList';
import DisplayResults from './DisplayResults.js';
function MainSearchPage()
{
  const [userSelection, setUserSelection]=useState('ca');
  const [trackList,setTrackList]=useState([]);
  const [currentList,setCurrentList] = useState([]);
  // create a reference to our database
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  useEffect(()=>{
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      console.log(data);
      for (let key in data) {
        // inside the loop, we push each song item to an array we already created inside the onValue() function called newState
        newState.push(data[key].id);
      }
      //console.log("newState is ", newState);
      setCurrentList(newState);
    })
  },[dbRef])
  // Define country parameter:
  const getCountries = (e, countries) => {
    e.preventDefault();
    console.log('getting country', countries);
    setUserSelection(countries);
    getSongs(userSelection);
  }
  // API call for getting data of top 10 songs in the specific country
  const getSongs =(userSelection)=>{
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
        })
      }

   // create a copy of trackList and placeholderList
   const copyOfTrackList = [...trackList];
   const copyOfPlaceHolderList=[...placeholderList];
   // this event will fire whenever the save button is clicked 

  const handleClick =(e)=>{
    console.log(e.target.className);//string 
    copyOfTrackList.forEach(songItem => {
      console.log("songItem id is", typeof(songItem.track.track_id));//number
      if(songItem.track.track_id.toString()===e.target.className){
        const savedSong ={
          id:songItem.track.track_id, 
          name:songItem.track.track_name,
          artist:songItem.track.artist_name,
          lyricLink:songItem.track.track_share_url
        }
        if (!currentList.includes(savedSong.id))
        {
          push(dbRef, savedSong);
        } else
        {
          alert("Song is already saved!");
        }
      }
    }
  );
  copyOfPlaceHolderList.forEach(songItem => {
    console.log("songItem id is", typeof(songItem.track.track_id));//number
    if(songItem.track.track_id.toString()===e.target.className){
      
      const savedSong ={
        id:songItem.track.track_id, 
        name:songItem.track.track_name,
        artist:songItem.track.artist_name,
        lyricLink:songItem.track.track_share_url
      }
      if (!currentList.includes(savedSong.id))
      {
        push(dbRef, savedSong);
      } else
      {
        alert("Song is already saved!");
      }
    }
  }
);
  }



  
  return (

      <main id="main">
        <Search getCountries={getCountries}/>
        <DisplayResults 
          trackList={trackList}
          country={countryMap.get(userSelection)}
          handleClick={handleClick}/>     
      </main>

    
  );
}

export default MainSearchPage;