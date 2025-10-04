import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 

function Navbar() {
  return (
    <NavLink to={"/"}>
      <nav className="w-full bg-blue-950 text-white shadow-md sticky top-0 left-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-start">
          <img 
            src={logo} 
            alt="MediAssist Logo" 
            className="h-24 w-auto cursor-pointer bg-white rounded-lg hover:scale-105 transition"
          />
        </div>
      </nav>
    </NavLink>
  ); 
}

export default Navbar;
