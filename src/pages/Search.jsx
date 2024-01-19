
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useGetSongsBySearchQuery} from "../redux/services/searchsong";
import { Loader,Error, SongCard } from "../components";
import { useEffect,useRef } from "react";

  // searchterm , search component le url bata pauni vayo, communicated between 2 components using url
  // next way as, state ko roopma searchterm lai store ma  haalni, balla search component could get the searchterm
const Search = () =>{
    const {searchTerm} = useParams()
    const searchRef = useRef(null);
    const {data, isFetching, error} =  useGetSongsBySearchQuery(searchTerm)
    const {activeSong, isPlaying} = useSelector((state)=>state.player)
    useEffect(()=>{
        searchRef.current?.scrollIntoView({behavior: 'smooth'})
    },[searchRef])

    const songs = data?.map((song)=>song.track)

    if(isFetching){
        return (<Loader title="Searching..."></Loader>)
    }
    if(error){
        return <Error/>
    }
    
  

    return(
        <div className="flex flex-col" ref={searchRef}>

          {!songs?.length ?  
          <h2 className="font-bold text-2xl text-white mt-16 mb-10 text-center">Sorry, no results found !</h2>
          :
          <>
            <h2 className="font-bold text-2xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black text-3xl">{searchTerm}</span></h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">

                {songs?.map((song,i) => (
                    <SongCard 
                    key={song.key} 
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    song={song}
                    data={songs}
                    i={i}/>
                ))}
            </div>
          
            </> }
        
            
        </div>
    )
}

export default Search;

