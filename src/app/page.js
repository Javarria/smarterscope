"use client"
import Image from "next/image";
import { useState } from "react";
export default function Home() {

  const [address, setaddress] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("We made it before the Try Catch in HandleSubmit")

    try {
      const response = await fetch('http://localhost:8080/generateScopeSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error submitting address: " + error);
    }

  }



  return (
    <div style={{backgroundColor: "black"}}>
      {/* DIV CONTAINING HEADER MATERIAL */}
      <div className="h-20 sm:h-24 bg-black flex items-center pl-4 pr-4">
        <div style={{width:"auto",height:"5vh",backgroundColor:"black",border:"0.2rem solid white",borderRadius:"1rem",padding:"1rem",display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
          <span style={{fontSize:"1.2rem",color:"white"}}>SmarterScope.AI</span>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",width:"100%"}}>
          <button style={{backgroundColor:"transparent",color:"black",border:"none",padding:"0.5rem"}}>
            <div style={{width:"1.5rem",height:"1.5rem",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <div style={{width:"100%",height:"0.15rem",backgroundColor:"white"}}></div>
              <div style={{width:"100%",height:"0.15rem",backgroundColor:"white"}}></div>
              <div style={{width:"100%",height:"0.15rem",backgroundColor:"white"}}></div>
            </div>
          </button>
        </div>
      </div>

      {/* DIV CONTAINING HEADER AND ADDRESS INPUT CCCCCCCCCHANGE HEIGHT TO AUTOOOOOOOOOO */}
      <div style={{backgroundImage: "url('/smarterscope.png')", borderRadius: "3rem", margin: "2rem"}} className="relative  h-auto border-green-500 border-2">


        

        <div className="w-full lg:h-3/4 border-orange-500 border-2 mb-8">
          {/* DIV HOLDING SMARTINGSCOPE.AI TEXT */}
          <div style={{width:"100%",height:"auto",paddingTop:"3rem",border:"2px solid blue",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <span style={{fontSize:"8rem",fontWeight:"bold",dropShadow:"lg"}}>SmarterScope.AI</span>
          </div>
          {/* DIV CONTAINING BRIEF DESCRIPTION */}
          <div style={{width:"100%",height:"15%",paddingBottom:"3rem",border:"2px solid blue",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <span style={{fontSize:"1.2rem",fontWeight:"100",textAlign:"center",letterSpacing:"0.1rem"}}>Built to reduce Cycle Time And Increase ROI For Each Claim</span>
          </div>
          {/* PORTION HOLDING USER INPUT FORM AND SUBMIT BUTTON */}
          <form onSubmit={handleSubmit} >    
            <div style={{height:"auto",border:"2px solid red",paddingLeft:"8rem",paddingRight:"1rem"}}>
              <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Paste Full Address Here" style={{border:"2px solid white",padding:"0.5rem",width:"70%",height:"4rem",fontSize:"1rem",borderRadius:"0.5rem",display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"1rem"}}/>
              
              <button style={{backgroundColor:"black",color:"white",border:"none",padding:"0.5rem",width:"25%",height:"3rem",fontSize:"1rem",cursor:"pointer",borderRadius:"0.5rem",display:"block",marginLeft:"auto",marginRight:"auto",fontWeight:"bold"}}>Submit</button>

            </div>
          </form>
        </div>

          <div style={{width:"60%",height:"400px",backgroundImage: "url('/ScopeSheet.png')",backgroundSize: "contain", display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"auto",marginRight:"auto",border:"2px solid yellow"}}>
          </div>

          <div>AFTER IMAGE OF SCOPE</div>
      
      </div>
    </div>
  );
}

{/* <Image
src ="/smarterscope.png"
alt = "Gradient home page background"
width={1000}
height={1000}
style={{
  objectFit: "fill",
  width: "100%",
  height: "100%",
  borderRadius: "4rem",
  padding: "1rem",
}}
></Image> */}
