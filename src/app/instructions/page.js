 "use client"
 import ColorBends from "../components/ColorBends"
 import Header from "../components/Header"
 import MainHomePageBody from "../components/MainHomePageBody"
export default function Instructions(){
    return(

        <div className="h-screen flex items-center justify-center">
        {/* Background animation */}
        <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
          <ColorBends />
        </div>
    
            
        {/* HEADER CONTAINER / BEGGINING OF PAGE */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-[80vh] border-green-500 border-2 mt-4 mx-auto">
            <div className="w-full md:w-[33.5%] h-[55vh] border-red-500 border-2"></div>
            <div className="w-full md:w-[33.5%] h-[55vh] border-red-500 border-2"></div>
            <div className="w-full md:w-[33.5%] h-[55vh] border-red-500 border-2"></div>

        </div>
      </div>
      


        )
    }
    // <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
    //   <ColorBends />
    // </div>
    // </div>
    // <div className="w-screen min-h-screen relative border-blue-600 border-8">
    // {/* Background animation */}