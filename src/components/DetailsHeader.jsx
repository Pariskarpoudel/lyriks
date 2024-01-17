// this component will be used dynamically for both artist details and song details page
import { Link } from "react-router-dom";
const DetailsHeader = ({artistId, artistData, songData,songid}) => {
  const song = songData?.resources['shazam-songs'][songid]
  const artist = artistData?.data[0]?.attributes
  return(
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
    </div>
    <div className="absolute inset-0 flex items-center">
      {/* absolute waala div ko z index dherai hunxa kya yettikai ni  */}
    {/* false? artistData?.data[0]?.attributes?.artwork?.url.replace('{w}','500').replace('{h}','500') */}
      <img src={artistId ?
      artist?.artwork?.url.replace('{w}','500').replace('{h}','500')
      :
      song?.attributes?.images?.coverArt} alt="art" 
      className="sm:w-44 w-28 sm:h-44 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"/>

      <div className="ml-5">
        {/* p tags are themselves block level (inside their parent container, tyo parent container  vori block ho, auta div vitra p xa vani,  p tyo block ko width samma matra jana sakxa/ block huna sakxa, it has no relation to body */}
        <p className="font-bold sm:text-3xl text-xl text-white">
        {artistId ? artist?.name : song?.attributes?.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${song?.relationships?.artists?.data[0]?.id}`}>
            <p className="text-base text-gray-400 mt-2">
              {song?.attributes?.artist}
            </p>
          </Link>
        )}
        <p className="text-base text-gray-400 mt-2">
              {artistId ?
              artist?.genreNames[0]
            :
            song?.attributes?.genres.primary}
            </p>
      </div>
    </div>
    <div className="w-full sm:h-44 h-24"></div>
  </div>
  )
};

export default DetailsHeader;
