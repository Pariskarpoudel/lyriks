import {useParams} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { useGetSongDetailsQuery , useGetSongRelatedQuery} from '../redux/services/shazam';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components'
import { setActiveSong, playPause } from '../redux/features/playerSlice';
const SongDetails = () => {
    // kunai ni bela kei click garera link to /songs/:songid /songs/adamid, yo path ma link garda sadai songdetails component khulxa
    const dispatch = useDispatch()
    const {songid} = useParams()
    console.log('songid is'+songid)
    const {activeSong,isPlaying} = useSelector((state)=>state.player)
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery(songid)
    const {data, isFetching: isFetchingRelatedSongs,error} = useGetSongRelatedQuery(songid)
    if(isFetchingSongDetails || isFetchingRelatedSongs)
    {
        return (<Loader title="Loading song details" />)
    }
    if (error) return <Error/>
    const relatedSongsData = data?.resources['shazam-song-lists'][`track-similarities-id-${songid}`]?.relationships?.tracks?.data
    const relatedSongsIds = relatedSongsData?.map((item,index)=>item.id)  // newlist = newitem for item in list, returns new item
    const relatedSongs = relatedSongsIds?.map((item)=>data?.resources['shazam-songs'][item]?.attributes)
    const relatedSongsArtistsIds= relatedSongsIds?.map((item)=>data?.resources['shazam-songs'][item]?.relationships['artist-highlights']?.data[0]?.id)
    const lyricsid = songData?.resources['shazam-songs'][`${songid}`]?.relationships?.lyrics?.data[0]?.id
    console.log('kale',relatedSongsArtistsIds)
    // aafai data ra isFetching aathe, we renamed it for easy
    console.log(relatedSongsIds)
    console.log(relatedSongs)
    const handlePauseClick = () => {
        dispatch(playPause(false))
      } 
    
    const handlePlayClick = (song,data,i) => {
        dispatch(setActiveSong({song,data, i})) // {a:a,b:b,c:c} means {a,b,c}
        // action ta object  thulai pathauna ni pauni raixu, aru modify garni kam reducer maa, reducer ma middleware use garna ni painxa kya, reducer jana vanda paila middlware jani wala
        dispatch(playPause(true))
      }
    return(
        <div className='flex flex-col'>
            <DetailsHeader  songData={songData} songid={songid}/>
            <div className='mb-10'>
                <h2 className='text-white text-3xl font-bold'> Lyrics:</h2>
                <div className='mt-5'>
                   {songData?.resources?.lyrics
                   ?
                   songData?.resources?.lyrics[`${lyricsid}`]?.attributes?.text.map((line,index)=>(<p className='text-gray-400 text-base my-1'>{line}</p>))
                   :
                   <p className='text-gray-400 text-base my-1'>Sorry, no lyrics found</p>
                   }
                </div>
            </div>
            <RelatedSongs
            data={relatedSongs}
            songids = {relatedSongsIds}
            relatedSongsArtistsIds={relatedSongsArtistsIds}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}   
    
            // auta song matra arg ko roopma pathauna milena handleplayclick ma, si bina arg nai esari func uta pathauna milxa, call garda balla arg dini
            />
        </div>
    )
}

export default SongDetails;
