import { getDatabase, ref,remove,onValue} from 'firebase/database';

import{useEffect,useState} from 'react';
import firebase from './firebase';
import NavBar from './NavBar.js';


function slide(direction,step=10,distance=400,speed=10){
  var container = document.getElementById('ToListenListID01');
  let scrollAmount = 0;
  var slideVar = setInterval(function(){
      if(direction === 'left'){
          container.scrollLeft -= step;
      } else {
          container.scrollLeft += step;
      }
      scrollAmount += step;
      if(scrollAmount >= distance){
          window.clearInterval(slideVar);
      }
  }, speed);
}

function ToListenList ({setIsAuth}){
  
  const[toListenList, setToListenList]=useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(()=>{
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/users/${userId}/list`);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        // inside the loop, we push each song item to an array we already created inside the onValue() function called newState
        newState.push({key: key, description: data[key]});
      }
      
      setToListenList(newState);
    })
  },[userId])


  const handleRemoveSong = (id) => {
    console.log(userId, id);
    // here we create a reference to the database 
    // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the song we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/users/${userId}/list/${id}`);
    // using the Firebase method remove(), we remove the node specific to the song ID
    remove(dbRef)
  }

  const displayToListenList=toListenList.map(songEntry=>{
    const songItem = songEntry.description;
    return(
      <>
        <div className="songContainer item" key={songItem.id}>
          <button className="deleteBtn" onClick={() => handleRemoveSong(songEntry.key)}><i class="fas fa-trash"></i></button>
          <h4><i class="fas fa-music"></i> {songItem.name}</h4>
          <p className="songArtist">{`Artist: ( ${songItem.artist} )`}</p>
          <p className="songGenre">{`Genre: ${songItem.genre}`}</p>
          <div className="links">
            <a href={songItem.lyricLink} target='_blank' rel='noreferrer' className="btn">Find Lyric <i class="fas fa-search"></i></a>
            <a href={`https://www.youtube.com/results?search_query=${songItem.name}+${songItem.artist}`} target='_blank'  rel='noreferrer' className="btn">Watch on <i class="fab fa-youtube-square"></i></a>
          </div>
        </div> 
      </>
    )
  });

  const emptyList = [1].map( entry => {
    return(
      <>
      <div className="songContainer item">
        <h4><i class="fas fa-music"></i>What are you looking for?</h4>
        <p class="songArtist">Oops, the library is empty :)</p>
        <p class="songArtist">Please add your favorite musics </p>
        <p class="songArtist">by clicking <div  className=" fas fa-save" /></p>
      </div> 
    </>
    )
  });


  return(
    <section className="results listResults">
      <NavBar setIsAuth={setIsAuth} />
      <h3><i class="fas fa-headphones"></i> My to-listen List <i class="fas fa-headphones"></i></h3>
      <div style={{width: '100%', overflow: 'hidden',
      display: 'flex', 
      alignItems:'center'}}>
        <button className="fas fa-chevron-circle-left fa-4x slide1"  style={{background:"none"}} onClick={()=>slide('left')}></button>
      {
        <div className="savedItemWrapper">
          <div className="carousel" id='ToListenListID01'>
          {
            (toListenList.length)? displayToListenList:emptyList
          }
          </div>
        </div>
      }
      <button className="fas fa-chevron-circle-right fa-4x slide2" style={{background:"none"}} onClick={()=>slide('right')}></button>
    </div>
  </section>
  )
}

export default ToListenList;