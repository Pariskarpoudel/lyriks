
import { useGetTopChartsQuery} from "../redux/services/shazam";
import { Loader,Error, ArtistCard } from "../components";


const TopArtists = () =>{
   
    const {data, isFetching, error} =  useGetTopChartsQuery()

    if(isFetching){
        return (<Loader title="Loading top charts"></Loader>)
    }
    if(error){
        return <Error/>
    }


    return(
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks?.map((song,i) => (
                    <ArtistCard
                    key={song.key} 
                    song={song}
                    />
                ))}
            </div>
          
    
        
            
        </div>
    )
}

export default TopArtists;

