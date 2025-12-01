"use client";
import Image from "next/image";
import ColorBends from "./components/ColorBends";
import Header from "./components/Header";
import MainHomePageBody from "./components/MainHomePageBody";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


export default function Home() {
  const [address, setaddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("We made it before the Try Catch in HandleSubmit");

    try {
      const response = await fetch("http://localhost:8080/generateScopeSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error submitting address: " + error);
    }
  };

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

