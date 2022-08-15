function DisplayResults(props){

  return (
    <section className="results">
      <h3><i class="fas fa-headphones"></i> Top 10 songs in {props.country} <i class="fas fa-headphones"></i></h3>
      {
        <div className="songs">
        {
          // map trackList and display each song object 
          props.trackList.map(songObject=>{
            const genre_list=songObject.track.primary_genres.music_genre_list;
            const genre = (genre_list.length>0)? genre_list[0].music_genre.music_genre_name: "Unknown";
            return(
              <div className="songContainer" key={songObject.track.track_id}>
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
  )
}

export default DisplayResults;