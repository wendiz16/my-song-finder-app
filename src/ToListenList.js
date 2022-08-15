import { getDatabase, ref,remove} from 'firebase/database';
import firebase from './firebase';
function ToListenList (props){
  console.log("View toListenList:",props)
  const handleRemoveSong = (id) => {
    // here we create a reference to the database 
    // this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the book we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${id}`);
    // using the Firebase method remove(), we remove the node specific to the book ID
    remove(dbRef)
  }
  return(
    <section className="results">
    <h3><i class="fas fa-headphones"></i> My to-listen List <i class="fas fa-headphones"></i></h3>
    {
      <div className="songs">
      {
        props.toListenList.map(songEntry=>{
          //const genre_list=songItem.track.primary_genres.music_genre_list;
          //const genre = (genre_list.length>0)? genre_list[0].music_genre.music_genre_name: "Unknown";
          const songItem = songEntry.description;
          return(
            <div className="songContainer" key={songItem.id}>
              <button onClick={() => handleRemoveSong(songEntry.key)}>Remove</button>
              <h4><i class="fas fa-music"></i> {songItem.name}</h4>
              <p className="songArtist">{`Artist: ( ${songItem.artist} )`}</p>
              <div className="links">
                <a href={songItem.lyricLink} target='_blank' rel='noreferrer' className="btn">Find Lyric <i class="fas fa-search"></i></a>
                <a href={`https://www.youtube.com/results?search_query=${songItem.name}+${songItem.artist}`} target='_blank'  rel='noreferrer' className="btn">Watch on <i class="fab fa-youtube-square"></i></a>
              </div>
            </div>
            
          )
        })
        
      }
    </div>
    }
  </section>
  )
}

export default ToListenList;