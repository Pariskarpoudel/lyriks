import SongBar from './SongBar'
const RelatedSongs = ({data,isPlaying,songids,activeSong, handlePauseClick, handlePlayClick,artistId,relatedSongsArtistsIds}) => 
  {
    console.log(songids)
    console.log(data)
    return(  <div className='flex flex-col'>
   {artistId? 
     <h1 className='font-bold text-3xl text-white'>Top Songs</h1>
     :
     <h1 className='font-bold text-3xl text-white'>Related Songs</h1>}
    <div className='mt-6 w-full flex flex-col'>
      {data?.map((song,i)=>(
        <SongBar 
        key={i}
        songid={songids?.[i]}
        song={song}
        i={i}
        relatedSongArtistId = {relatedSongsArtistsIds?.[i]}
        artistId={artistId} // it came by clicking a particular artist name , artist ko get details
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={data}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}/>
      ))}
    </div>
  </div>
)
  }


export default RelatedSongs;
