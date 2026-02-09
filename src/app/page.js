"use client";
import Image from "next/image";
import ColorBends from "./components/ColorBends";
import Header from "./components/Header";
import MainHomePageBody from "./components/MainHomePageBody";



export default function Home() {

  return (

  <div className="w-screen min-h-screen relative">
    {/* Background animation */}
    <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
      <ColorBends colors={["#00fa11"]} />
    </div>   
    {/* HEADER CONTAINER / BEGGINING OF PAGE */}
        <Header/>
      
        <MainHomePageBody/>

    
  </div>
  
  );
}


