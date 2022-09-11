import placeholderList from './placeholderList';
import Footer from'./Footer.js';


function DisplayResults(props){
  const headerLine = (props.trackList.length!==0)? `Top 10 songs in ${props.country}`: "Some songs in different countries";
  let trackList = (props.trackList.length!==0)? props.trackList : placeholderList;
  console.log("DisplayResults isAuth: ", props.isAuth)
  return (
    <>
      <section className="results">
        <h3><i class="fas fa-headphones"></i> {headerLine} <i class="fas fa-headphones"></i></h3>
        {
          <div className="songs">
          {
            trackList.map(songObject=>{
              const genre_list=songObject.track.primary_genres.music_genre_list;
              const genre = (genre_list.length>0)? genre_list[0].music_genre.music_genre_name: "Unknown";
              console.log("trackList isAuth", props.isAuth);
              let button;
              if (props.isAuth){
                button = <button className={`${songObject.track.track_id} saveBtn fas fa-save`} onClick={props.handleClick} />;
              } 
              
              return(
                <div className="songContainer" key={songObject.track.track_id}>
                  {button}
                  <h4><i class="fas fa-music"></i> {songObject.track.track_name}</h4>
                  <p className="songArtist">{`Artist: ( ${songObject.track.artist_name} )`}</p>
                  <p className="songGenre">{`Genre: ${genre}`}</p>
                  <div className="links">
                    <a href={songObject.track.track_share_url} target='_blank' rel='noreferrer' className="btn">Find Lyric <i class="fas fa-search"></i></a>
                    <a href={`https://www.youtube.com/results?search_query=${songObject.track.track_name}+${songObject.track.artist_name}`} target='_blank'  rel='noreferrer' className="btn">Watch on <i class="fab fa-youtube-square"></i></a>
                  </div>
                </div>
                
              )
            })  
          }
        </div>
       }
      </section>
     <Footer/> 
   </>
  )
}

export default DisplayResults;