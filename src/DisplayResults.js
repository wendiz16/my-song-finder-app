function DisplayResults(props){
  

  return (
    <section className="results">
      <h3>Top 12 songs in selected country </h3>
      {
        <div className="songs">
        {
          props.trackList.map(songObject=>{
            return(
              <div className="songContainer" key={songObject.track.track_id}>
                <h3>{songObject.track.track_name}</h3>
                <p className="songArtist">{songObject.track.artist_name}</p>
                <a href={songObject.track.track_share_url} target='_blank'>Find More Info</a>
                <a href={`https://www.youtube.com/results?search_query=${songObject.track.track_name}`} target='_blank'>View YouTube</a>
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