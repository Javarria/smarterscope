import Link from "next/link";

const MainHomePageBody = () => {
  return (
    <div className="h-[90vh] w-full border-red-500 mt-4">
      <div className="w-full h-[35vh] border-green-500 border-2 flex items-center justify-center">
        <p className="text-center text-[calc(1.95rem+2vw)] font-bold pr-1 pl-1 z-1">
          The solution youve been asking for
        </p>
      </div>

      <div className="flex items-center justify-center z-2">

        <Link href="/instructions" style={{zIndex: 2}}>

          <button className="h-[calc(1.95rem+2vw)] w-auto z-1 text-white font-extrabold mt-4 pl-4 pr-4" style={{fontWeight: "900", border: "1px solid grey"}}>
            CLICK FOR INSTRUCTIONS
          </button>
        </Link>
      </div>
      {/* FORM FOR SUBMITTING THE CLAIM ADDRESS */}
      <form className="w-full h-[17vh] flex flex-col items-center justify-center pr-2 pl-2">

    
        <input
          placeholder="Enter Claim address here"
          className="h-[calc(1.95rem+2vw)] w-[75%] bg-white rounded-[4rem] pl-[1.5rem] pr-1 z-1 mt-4"
          style={{color: "rgba(0,0,0,0.7)"}}
        ></input>

        <button className="h-[calc(1.95rem+2vw)] w-[calc(3rem+20vw)] bg-[rgba(255,255,255,0.2)] rounded-[5rem] mr-1 mt-2 ml-1 backdrop-blur-[40px] z-1 border-white">
          {" "}
          Submit{" "}
        </button>
      </form>

      <div className="w-full h-[35vh] ml-2 mr-4 border-green-500 flex items-center justify-center z-10">
        <div>This product was not directly developed by Seek Now LLC</div>
      </div>
    </div>
  );
  }
export default MainHomePageBody;
