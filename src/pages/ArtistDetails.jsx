import {useParams} from 'react-router-dom'
import { useSelector} from 'react-redux';
import { useGetArtistDetailsQuery,useGetArtistRelatedSongsQuery} from '../redux/services/shazam';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components'

const ArtistDetails = () => {
    // kunai ni bela kei click garera link to /songs/:songid /songs/adamid, yo path ma link garda sadai songdetails component khulxa
    
    const {id: artistId} = useParams()

    const {activeSong,isPlaying} = useSelector((state)=>state.player)
    const {data: artistData, isFetching: isFetchingArtistDetails,error} =  useGetArtistDetailsQuery(artistId)
    const {data: artistSongs, isFetching: isFetchingArtistSongs} =  useGetArtistRelatedSongsQuery(artistId)
    if(isFetchingArtistDetails || isFetchingArtistSongs)
    {
        return (<Loader title="Loading artist details" />)
    }
    if (error) return <Error/>

   
    return(
        <div className='flex flex-col'>
            <DetailsHeader  artistData={artistData} artistId={artistId}/>
           
             <RelatedSongs
            data={artistSongs?.data}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
           />
        </div>
    )
}

export default ArtistDetails;
