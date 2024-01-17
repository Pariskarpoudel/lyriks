import { useNavigate } from "react-router-dom";
// link is for href like anchor tag, but to navigate without link tagg , we use usenavigate hook

const ArtistCard = ({song, i}) => {
  const navigate = useNavigate()
  return(
    <div onClick={()=>navigate(`/artists/${song?.artists[0]?.adamid}`)} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img src={song?.images?.coverart} alt="artist" className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">{song?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;
