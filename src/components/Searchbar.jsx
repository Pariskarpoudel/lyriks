import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FiSearch} from 'react-icons/fi'
const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
  e.preventDefault();
  navigate(`/search/${searchTerm}`)
  // searchterm search component le url bata pauni vayo, communicated between 2 components using url
  // next way as, state ko roopma searchterm lai store ma  haalni, balla search component could get the searchterm
  }


// document .getelement ko satta  ref, useref to give reference to a react component or element 
return(
  <div className="w-[64%]">
<form autoComplete="off" onSubmit={handleSubmit} className=" text-gray-400 p-2 focus-within:text-gray-600">
  {/* esko within ka kunai element like input focus maa aaepar , this whole form will be selected and applied a text-gray-600, so input focus huda searchicon  ko ni color gray vayo, yo icon ni text ho kya  */}
  <label htmlFor="search-field" className="sr-only">Search all songs</label>
  <div className="flex flex-row justify-start items-center">
    <FiSearch className='w-6 h-6 ml-4'/>
    <input 
    type="search"
    name="search-field"
    id="search-field"
    placeholder="Search"
    value={searchTerm}
    onChange={(e)=>{setSearchTerm(e.target.value)}}
    className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
    />
    
  </div>
</form>
</div>
)
};

export default Searchbar;
