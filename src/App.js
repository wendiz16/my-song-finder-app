import{useEffect,useState} from 'react';
import axios from 'axios';
import Header from './Header.js';
import Search from './Search.js';

function App() {
  //const[trackList,setTrackList]=useState([]);
  
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
        country:'ca',
        f_has_lyrics:1,
        apikey:'bb5df0cd53ff7e0ab07a9b17e5a6fb30'

      },
    })

      .then(res=>{
       console.log(res.data);
       //setTrackList(res.data.message.body.track_list);
      })
      .catch(err=>{
       console.log(err)
       alert()
     }
       );
   
     },[])
   
  
  
  return (
    <div className="App">
      <Header />
      <Search />
    </div>
    
  );
}

export default App;
