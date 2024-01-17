import { useDispatch,useSelector } from 'react-redux';
import {Error, Loader, SongCard} from '../components'
import {genres} from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazam';
import { useGetSongsByGenreQuery } from '../redux/services/shazam_lite';
 // map ma ( item, index, array)
import { selectGenreListId } from '../redux/features/playerSlice';
import { useEffect, useState } from 'react';


 // genre jun select garxa tei anusar aru dherai component render hunxan, so aile kun genre selected xa, tyo lai redux  store/state  ma rakhni, ani get the current selected genre from there too
// like dispatch(setActivesong(song))

const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying,genreListId} = useSelector((state)=>state.player);
    // const [genre, setGenre] = useState("POP")
    // const [data, setData] = useState([])
    const {data , isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP')
    // const {data, isFetching, error} = useGetTopChartsQuery();   // destructuring, we get these 3 things, data means response, isfetching means pending
   
   
    if (isFetching){
        return <Loader title="Loading songs..."/>;
    }
    if(error){
        return <Error/>
    }

    // useEffect(()=>{
    //     fetchSongsByGenre(genreListId || 'POP')

    // },[genre])
    const genreTitle = genres.filter((item)=>item.value===genreListId)[0]?.title
    // array.filter ko alternative jasto array.find , func ko arg ma ni item,index,array , same map ra filter jhai, return condition garni duitaima,tyo condition satisfy huni first item return garxa, helps to find element in array

    // const fetchSongsByGenre = (genre) => {
    //     const url = `https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre?genre=${genreListId || 'POP'}&limit=25`;
    //     const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'eecc8f0018mshb1e469686d439bbp147c89jsn4290ae04b05b',
    //         'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
    //     }
    //     };

    //     try {
    //         fetch(url, options)
    //         .then(res=>res.json())
    //         .then(result=>{console.log(result)
    //             setData(result?.tracks)})
    //         .catch((err)=><Error/>)
      
    //     } 
        
    //     catch (error) {
    //        (<Error/>)
    //     }
               
    // }

    return(
        <div className='flex flex-col'>
          
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 pt-1'>
               <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle || 'Pop'}</h2>
               <select 
               onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}}
               // local state vaepar,const [genre, setGenre] = useState("")  onchange={setGenre(e.target.value)} , value={genre}
               value={genreListId || 'pop'}
               className='bg-black text-gray-300 p-3 text-sm text-left rounded-lg outline-none sm:mt-0 mt-5 mr-3 w-[6rem]'>

                {genres?.map((genre)=><option key={genre.value} value={genre.value}>{genre.title}</option>)}
               </select>

            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.tracks?.map((song,i)=>
            <SongCard  key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>)
            // data?.map() , data exists?, if it does then only map, so pending state ma data exist nagarda error dinivaena, sidai data.map ma error dina sakthyo
        }
            </div>
       
            
            
        </div>
    );
};



export default Discover;
