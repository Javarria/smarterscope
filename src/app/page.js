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

  <div className="w-screen min-h-screen relative border-blue-600 border-8">
    {/* Background animation */}
    <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
      <ColorBends />
    </div>

        
    {/* HEADER CONTAINER / BEGGINING OF PAGE */}
        <Header/>
        <MainHomePageBody/>

    
  </div>
  
  );
}



{/* <div style={{height: "90vh", width: "100vw", border: "1px solid red", marginTop: "4rem"}}>
  <div style={{width: "100%", height: "35vh", border: "2px solid green", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <p style={{
      textAlign: "center",
      fontSize: "calc(1.95rem + 2vw)",
      fontWeight: "bold"
    }}>The solution youve been asking for</p>
  </div>
  <form style={{width: "100%", height: "15vh", border: "2px solid blue", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <input placeholder="Enter Claim address here" style={{height: "calc(1.95rem + 2vw)", width: "45vw", backgroundColor: "white", borderRadius: "4rem", color: "#666666", paddingLeft: "1rem", paddingRight: '1rem'}}></input>
      <button style={{height: "calc(1.95rem + 2vw)", backgroundColor: "black", borderRadius: "4rem", border: "1px solid white", paddingLeft: "1rem", paddingRight: "1rem", marginLeft: "1rem"}} > Submit </button>
  </form>


  <div style={{width: "100%", height: "35vh", border: "2px solid green", display: "flex", justifyContent: "center", alignItems: "center"}}>
  <div>This is product was not directly developed by Seek Now LLC</div>
  </div>



</div> */}

{/* <div style={{height: "100vh", backgroundColor: "white"}}> </div> */}
// I WANT IT TO BE FROM MD AND UP LEFT ALIGN NOT IN THE MIDDLE
    // <div className="w-screen h-screen border-red-500 ">
      
    //   {/* <div style={{height: "10vh", borderWidth: "2px", borderColor: "white", backgroundColor: "transparent"}}></div> */}
    //   <ColorBends/>
    //   <div style={{height: "10vh", backgroundColor: "transparent", position: "absolute", top: 0, left: 0, right: 0, zIndex: 1, borderWidth: "2px", borderColor: "white"}}></div>
      
    // </div>

      // DIV CONTAINING HEADER MATERIAL
      // <div className="h-20 sm:h-24 bg-black flex items-center pl-4 pr-4">
      //   <div
      //     style={{
      //       width: "auto",
      //       height: "5vh",
      //       backgroundColor: "black",
      //       border: "0.2rem solid white",
      //       borderRadius: "1rem",
      //       padding: "1rem",
      //       display: "flex",
      //       justifyContent: "flex-start",
      //       alignItems: "center",
      //     }}
      //   >
      //     <span style={{ fontSize: "1.2rem", color: "white" }}>
      //       SmarterScope.AI
      //     </span>
      //   </div>
      //   <div
      //     style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      //   >
      //     <button
      //       style={{
      //         backgroundColor: "transparent",
      //         color: "black",
      //         border: "none",
      //         padding: "0.5rem",
      //       }}
      //     >
      //       <div
      //         style={{
      //           width: "1.5rem",
      //           height: "1.5rem",
      //           display: "flex",
      //           flexDirection: "column",
      //           justifyContent: "space-between",
      //         }}
      //       >
      //         <div
      //           style={{
      //             width: "100%",
      //             height: "0.15rem",
      //             backgroundColor: "white",
      //           }}
      //         ></div>
      //         <div
      //           style={{
      //             width: "100%",
      //             height: "0.15rem",
      //             backgroundColor: "white",
      //           }}
      //         ></div>
      //         <div
      //           style={{
      //             width: "100%",
      //             height: "0.15rem",
      //             backgroundColor: "white",
      //           }}
      //         ></div>
      //       </div>
      //     </button>
      //   </div>
      // </div>

      // {/* DIV CONTAINING HEADER AND ADDRESS INPUT CCCCCCCCCHANGE HEIGHT TO AUTOOOOOOOOOO */}
      // <div
      //   style={{
      //     backgroundImage: "url('/smarterscope.png')",
      //     borderRadius: "3rem",
      //     margin: "2rem",
      //   }}
      //   className="relative  h-auto border-green-500 border-2"
      // >
      //   <div className="w-full lg:h-3/4 border-orange-500 border-2 mb-8">
      //     {/* DIV HOLDING SMARTINGSCOPE.AI TEXT */}
      //     <div
      //       style={{
      //         width: "100%",
      //         height: "auto",
      //         paddingTop: "3rem",
      //         paddingLeft: "2rem",
      //         paddingRight: "2rem",
      //         border: "2px solid blue",
      //         display: "flex",
      //         justifyContent: "center",
      //         alignItems: "center",
      //       }}
      //     >
      //       <span
      //         style={{ fontSize: "8rem", fontWeight: "bold", dropShadow: "lg" }}
      //       >
      //         SmarterScope.AI
      //       </span>
      //     </div>
      //     {/* DIV CONTAINING BRIEF DESCRIPTION */}
      //     <div
      //       style={{
      //         width: "100%",
      //         height: "15%",
      //         paddingBottom: "3rem",
      //         paddingLeft: "4rem",
      //         paddingRight: "4rem",
      //         border: "2px solid blue",
      //         display: "flex",
      //         justifyContent: "center",
      //         alignItems: "center",
      //       }}
      //     >
      //       <span
      //         style={{
      //           fontSize: "1.2rem",
      //           fontWeight: "100",
      //           textAlign: "center",
      //           letterSpacing: "0.1rem",
      //         }}
      //       >
      //         Built to reduce Cycle Time And Increase ROI For Each Claim
      //       </span>
      //     </div>
      //     {/* PORTION HOLDING USER INPUT FORM AND SUBMIT BUTTON */}
      //     <form onSubmit={handleSubmit}>
      //       <div
      //         style={{
      //           height: "auto",
      //           border: "2px solid red",
      //           paddingLeft: "8rem",
      //           paddingRight: "1rem",
      //         }}
      //       >
      //         <input
      //           type="text"
      //           value={address}
      //           onChange={(e) => setaddress(e.target.value)}
      //           placeholder="Paste Full Address Here"
      //           style={{
      //             border: "2px solid white",
      //             padding: "0.5rem",
      //             width: "70%",
      //             height: "4rem",
      //             fontSize: "1rem",
      //             borderRadius: "0.5rem",
      //             display: "block",
      //             marginLeft: "auto",
      //             marginRight: "auto",
      //             marginBottom: "1rem",
      //           }}
      //         />

      //         <button
      //           style={{
      //             backgroundColor: "black",
      //             color: "white",
      //             border: "none",
      //             padding: "0.5rem",
      //             width: "25%",
      //             height: "3rem",
      //             fontSize: "1rem",
      //             cursor: "pointer",
      //             borderRadius: "0.5rem",
      //             display: "block",
      //             marginLeft: "auto",
      //             marginRight: "auto",
      //             fontWeight: "bold",
      //           }}
      //         >
      //           Submit
      //         </button>
      //       </div>
      //     </form>
      //   </div>

      //   <div
      //     style={{
      //       display: "flex",
      //       justifyContent: "center",
      //       marginTop: "2rem",
      //       marginBottom: "1rem",
      //     }}
      //   >
      //     <Image
      //       src="/ScopeSheet.png"
      //       alt="Scope Sheet Image"
      //       width={500}
      //       height={500}
      //       style={{
      //         objectFit: "contain",
      //         width: "35%",
      //         height: "35%",
      //         borderRadius: "1rem",
      //         padding: "1rem",
      //       }}
      //     ></Image>
      //   </div>

      //   <div>AFTER IMAGE OF SCOPE</div>
      // </div>