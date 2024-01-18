import { useState } from "react";
import { NavLink } from "react-router-dom";
import {RiCloseLine} from "react-icons/ri"
import {logo} from '../assets'
import {links} from '../assets/constants'
import {HiOutlineMenu} from 'react-icons/hi'
const NavLinks = () => (
  // it will be reusable component for both mobile and desktop devices
  <div className="mt-10">
    {links.map((item)=>(
      <NavLink
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
      onClick={()=>{}}>
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}</NavLink>
    ))}
  </div>
)

const Sidebar = () => {
// we need to know if mobile navbar is open coz it has different design
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return(
  <>
  <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
  {/* md:flex hidden, for md and more: flex, expect it (natravani): hidden */}
  <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
  <NavLinks/>
  </div>

  <div className="absolute md:hidden block top-6 right-3">
    {mobileMenuOpen 
    ?
    (<RiCloseLine onClick={()=>{setMobileMenuOpen(false)}} className="w-8 h-8 text-white mr-2 cursor-pointer"/>)
    :
    (<HiOutlineMenu onClick={()=>{setMobileMenuOpen(true)}} className="w-8 h-8 text-white mr-2 cursor-pointer"/>) }
  </div>

  <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen?'left-0':'hidden'}`}>
  {/* md:flex hidden, for md and more: flex, expect it (natravani): hidden */}
  <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
  <NavLinks handleClick={()=>{setMobileMenuOpen(false)}}/>
  </div>
  </>
)

}

export default Sidebar;
