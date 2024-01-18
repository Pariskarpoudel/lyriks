import { useEffect, useRef } from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from "../redux/services/shazam";

import 'swiper/css'
import 'swiper/css/free-mode'


const TopChartCard = ({song,i,isPlaying,activeSong,handlePauseClick,handlePlayClick}) => (
  
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i+1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title}  className="h-16 w-16 rounded-lg"/>
      <div className="flex flex-1 flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-base font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={()=>handlePlayClick(song,i)} />
    </div>
  
)

const TopPlay = () => {
  const divRef = useRef(null);
  const dispatch = useDispatch() 
  const {activeSong, isPlaying} = useSelector((state)=>state.player)
  const {data} = useGetTopChartsQuery();
  

  useEffect(()=>{
    // divref.current returns that element here like by using dom query selectors
    // if(!divRef.current){
    //   return;
    // }
    // behavior instant rakhe sidhai mathi jo dekhinxa, mobile view ma refresh garda suruma bottom of the page dekhairathyo
    divRef.current?.scrollIntoView({behavior: 'smooth'})}
  )

  const topPlays = data?.tracks?.slice(0,5);
  const topArts = data?.tracks?.slice(0,10)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  } 
 
  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({song, data , i})) // {a:a,b:b,c:c} means {a,b,c}
    dispatch(playPause(true))}

  return(

  <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col relative">
    
      <div className="w-full flex flex-col">
   
          <div className='flex flex-row justify-between items-center'>
            {topPlays?.length ? (<>
          <h2 className="text-white font-bold text-2xl ml-3">Top Charts</h2>
          <Link to="/top-charts"><p className="text-gray-300 text-base cursor-pointer">See more</p></Link>
          </>   
          ) 
          :
          ("")
          }
       
        </div>
      
      <div className="mt-4 flex flex-col gap-0">
        {topPlays?.map((song,i)=>(
          <TopChartCard  key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
        ))}
      </div>
      </div>
    
      <div className="w-full flex flex-col mt-5">
    
        <div className="flex flex-row justify-between items-center">
          {topArts?.length ? (<>
            <h2 className="text-white font-bold text-2xl ml-3">Top Artists</h2>
          <Link to="/top-artists"><p className="text-gray-300 text-base cursor-pointer">See more</p></Link>
          </>)
          :
          (<></>)
          }
         
        </div>

        <Swiper 
        // it can be alternative to carousel, it may also be used with slides as photos or images of some ecommerce websites , eg: swiping stories in fb
        // width:'25%',height:'auto' le width anusar height afai adjust  
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-5">
          {topArts?.map((song,i)=>(
            <SwiperSlide key={song?.key} style={{width:'20%',height:'auto'}} className="shadow-lg rounded-full animate-slider">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      

      </div>
      </div>
  

  )
  };

export default TopPlay;
