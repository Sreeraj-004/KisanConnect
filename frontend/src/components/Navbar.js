import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({title}){
    const navigate=useNavigate();
    return(
        <div className="w-full h-20 bg-gradient-to-r from-[#dcfce7] via-[#a7f3d0] to-[#b1efcb] border border-s-2 border-green-400 grid grid-cols-3 px-12 items-center">
  
            {/* left logo */}
            <div className="justify-self-start font-logo text-2xl text-primary">
                <h1>Kissan Connect</h1>
            </div>

            {/* page title */}
            <div className="justify-self-center font-logo text-4xl text-primary">
                <h1>{title}</h1>
            </div>

            {/* profile options */}
            <div className="justify-self-end font-logo text-2xl text-primary cursor-pointer ">
                <h1 onClick={()=>navigate("/dashboard")}>Profile</h1>
            </div>

        </div>
        
    )
}
export default Navbar;