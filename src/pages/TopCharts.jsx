
import { useSelector } from "react-redux";
import { useGetTopChartsQuery} from "../redux/services/shazam";
import { Loader,Error, SongCard } from "../components";


const TopCharts = () =>{
   
    const {data, isFetching, error} =  useGetTopChartsQuery()
    const {activeSong, isPlaying} = useSelector((state)=>state.player)



    if(isFetching){
        return (<Loader title="Loading top charts"></Loader>)
    }
    if(error){
        return <Error/>
    }



    return(
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks?.map((song,i) => (
                    <SongCard 
                    key={song.key} 
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    song={song}
                    data={data?.tracks}
                    i={i}/>
                ))}
            </div>
          
    
        
            
        </div>
    )
}

export default TopCharts;

