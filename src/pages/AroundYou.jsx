import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSongDetailsQuery} from "../redux/services/shazam";
import { Loader,Error, SongCard } from "../components";


const AroundYou = () =>{
   
    const [country,setCountry] = useState("")
    const [loading, setLoading] = useState(true)
  
 
    const [songs, setSongs] = useState([])    


    const {activeSong, isPlaying} = useSelector((state)=>state.player)


           
    

    useEffect(()=>{
        fetch('https://api.country.is/')
        .then(res=>res.json())
        .then((res)=>{
        setCountry(res?.country)})
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false))
    },[country])

    // kunai ni state change huda whole component rerender, return() ta rerender hunxa jo, return agadi jun code hunxa js ko, tyo pani feri run hunxa
    // const component=()=> {  console.log(kale)            return(div)} 
    // so yettikai setState() garepar useffect sita or binaa pani, aafailooop ma ghusxa, kale print vako vai garxa
    useEffect(()=>{
        if(country){
            fetchSongsAroundYou(country)
        }
        
       
    },[country])
   // we can use useeffect multiple times like this 

    // if(loading && songs.length){
    //     return (<Loader title="Loading songs around you"></Loader>)
    // }


const fetchSongsAroundYou = (countryCode) => {
        const url = `https://shazam-api9.p.rapidapi.com/top?top=country&country=${country}&limit=25&index=0`;
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eecc8f0018mshb1e469686d439bbp147c89jsn4290ae04b05b',
            'X-RapidAPI-Host': 'shazam-api9.p.rapidapi.com'
        }
        };

        try {
            fetch(url, options)
            .then(res=>res.json())
            .then(result=>{console.log(result)
                setSongs(result?.tracks)})
            .catch((err)=><Error/>)
      
        } 
        
        catch (error) {
           (<Error/>)
        }
               
    }
 


   




    

    //     songidsAroundYou?.map((item,index)=>{
    //         const {data: songData, isFetching: isFetchingSongData}=useGetSongDetailsQuery(item)
    //             // songData = songDetails(item)
    //             setSongsAroundYou(oldarray=>[...oldarray,songData])
    //     })
    //     console.log(songidsAroundYou)
    // }
       
       

    //     console.log(songsAroundYou)
    // }


    return(
        <div className="flex flex-col">
            
            { !songs.length ? (<Loader title="Loading songs around you"/>)
            :
            <>
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You <span className="font-black"> {country}</span></h2>
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
            </>
    
        }
            
        </div>
    )
}

export default AroundYou;
