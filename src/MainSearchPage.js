import{useEffect,useState} from 'react';
import { getDatabase, ref,push,onValue} from 'firebase/database';
import firebase from './firebase';
import axios from 'axios';
import Search from './Search.js';
import countryMap from './countryMap.js';
import placeholderList from './placeholderList';
import DisplayResults from './DisplayResults.js';
import NavBar from './NavBar.js';

function MainSearchPage(props)
{
  const [userSelection, setUserSelection]=useState('ca');
  const [trackList,setTrackList]=useState([]);
  const [currentList,setCurrentList] = useState([]);
  const userId = localStorage.getItem("userId");
  const isAuth = localStorage.getItem("isAuth");
  console.log("MainSearchPage isAuth", props.isAuth);
  // Define country parameter:
  const getCountries = (e, countries) => {
    e.preventDefault();
    console.log('getting country', countries);
    getSongs(countries);
    setUserSelection(countries);

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
    }).then(res=>{
      console.log(res.data.message.body.track_list[0].track.track_name);
      console.log("setTrackList ran", )
      setTrackList(res.data.message.body.track_list);
    }).catch(err=>{
      console.log(err);
      alert("Sorry, there is something wrong...");
    })
  }
   
  // create a reference to our database

  
  useEffect(()=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database,`/users/${userId}/list`);
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
  },[userId])

  // create a copy of trackList and placeholderList
  const copyOfFullList = [...trackList].concat([...placeholderList])
  
  // this event will fire whenever the save button is clicked 
  const handleClick =(e)=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/users/${userId}/list`);
    let songIDSet = new Set();
    copyOfFullList.forEach(songItem => {
      if(songItem.track.track_id.toString()===e.target.classList[0]){
        let songLooped = songIDSet.has(songItem.track.track_id);
        if (!songLooped) {
          songIDSet.add(songItem.track.track_id);
        } else return;
        console.log("thing is",e.target.classList);
        const genre_list=songItem.track.primary_genres.music_genre_list;
        const genre = (genre_list.length>0)? genre_list[0].music_genre.music_genre_name: "Unknown";
        const savedSong ={
          id:songItem.track.track_id, 
          name:songItem.track.track_name,
          artist:songItem.track.artist_name,
          genre:genre,
          lyricLink:songItem.track.track_share_url
        }
        console.log("savedSong",savedSong);
        if (!currentList.includes(savedSong.id))
        {
          console.log("pushing", songItem.track.track_id)
          push(dbRef, savedSong);
        } else{
          alert("Song is already saved!");
        }
      }
    });
  }  


  
  return (
      
      <main id="main">
        
        <Search getCountries={getCountries} isAuth={isAuth}/>
        <DisplayResults 
          trackList={trackList}
          country={countryMap.get(userSelection)}
          isAuth={props.isAuth}
          handleClick={handleClick}/>   
        <NavBar setIsAuth={props.setIsAuth} />  
      </main>
    
  );
}

export default MainSearchPage;