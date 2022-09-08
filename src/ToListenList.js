import { getDatabase, ref,remove,onValue} from 'firebase/database';

import{useEffect,useState} from 'react';
import firebase from './firebase';


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

function ToListenList (){
  
  const[toListenList, setToListenList]=useState([]);
  
  const database = getDatabase(firebase);
  const dbRef = ref(database);
  useEffect(()=>{
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        // inside the loop, we push each song item to an array we already created inside the onValue() function called newState
        newState.push({key: key, description: data[key]});
      }
      
      setToListenList(newState);
    })
  },[dbRef])


  const handleRemoveSong = (id) => {
    // here we create a reference to the database 
    // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the song we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${id}`);
    // using the Firebase method remove(), we remove the node specific to the song ID
    remove(dbRef)
  }
  return(
    <section className="results listResults">
      <h3><i class="fas fa-headphones"></i> My to-listen List <i class="fas fa-headphones"></i></h3>
      <div style={{width: '100%', overflow: 'hidden',
      display: 'flex', 
      alignItems:'center'}}>
        <button className="fas fa-chevron-circle-left fa-4x "  onClick={()=>slide('left')}></button>
      {
        <div className="savedItemWrapper">
          <div className="carousel" id='ToListenListID01'>
          {
          toListenList.map(songEntry=>{
            const songItem = songEntry.description;
            return(
              <>
                <div className="songContainer item" key={songItem.id}>
                  <button className="deleteBtn"onClick={() => handleRemoveSong(songEntry.key)}><i class="fas fa-trash-alt"></i></button>
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
          })
    
        }
          </div>
        </div>
      }
      <button className="fas fa-chevron-circle-right fa-4x "  onClick={()=>slide('right')}></button>
    </div>
  </section>
  )
}

export default ToListenList;