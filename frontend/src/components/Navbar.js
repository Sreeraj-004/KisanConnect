import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({title}){
    const navigate=useNavigate();
    return(
        <div className="w-full h-20 bg-gradient-to-r from-[#dcfce7] via-[#a7f3d0] to-[#b1efcb] border border-s-2 border-green-400 grid grid-cols-3 px-12 items-center">
  
            {/* left logo */}
            <div className="justify-self-start font-logo text-2xl text-primary cursor-pointer">
                <h1 onClick={()=>navigate("/")}>Kissan Connect</h1>
            </div>

            {/* page title */}
            <div className="justify-self-center font-logo text-4xl text-primary">
                <h1>{title}</h1>
            </div>

            {/* profile options */}
            <div className="justify-self-end font-logo text-2xl text-primary cursor-pointer gap-2 flex">
                <div className="flex h-full justify-center">
                    <ShoppingCartIcon className="w-7 h-7 mx-1" /><h1 onClick={()=>navigate("/Cart")}></h1>
                </div>
                <div className="flex h-full justify-center">
                    <UserIcon className="w-7 h-7 mx-1" /><h1 onClick={()=>navigate("/dashboard")}></h1>
                </div>
            </div>

        </div>
        
    )
}
export default Navbar;