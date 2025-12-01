import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],      // always include subsets
    weight: ["400","700"],   // optional weights
    variable: "--font-montserrat" // optional CSS variable
  });

// IMPLEMENTATION OF MOMO IS DONE USING > style={{fontFamily: "var(--font-momo)"}}

const MainHomePageBody = () => {
  return (
    <div className="h-[90vh] w-full mt-4">
      <div className="w-full h-[35vh]  flex items-center justify-center">
        <p className="text-center text-[calc(3.50rem+2vw)] font-momo pr-1 pl-1 z-1" style={{fontFamily: "var(--font-momo), sans-serif"}} >
          A Solution For Every Seeker  
        </p>
      </div>


            <Link href="/instructions" style={{zIndex: 2}}>
            <button className="md:hidden sm:flex sm:flex-shrink-0 size-7 absolute top-249/500 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M7 .185c1.682 0 3.402.488 4.628 1.512c1.382 1.154 2.08 3.011 2.176 4.856s-.402 3.776-1.538 5.11C11.022 13.124 8.98 13.816 7 13.816s-4.022-.692-5.266-2.153C.598 10.329.099 8.398.196 6.553S.99 2.85 2.372 1.697C3.598.673 5.318.185 7 .185m.257 2.906c.345 0 .625.28.625.625v.323a.625.625 0 1 1-1.25 0v-.323c0-.345.28-.625.625-.625m-1.51 2.284a.625.625 0 0 0 0 1.25h.496c.207 0 .375.168.375.375v2.106H5.76a.625.625 0 1 0 0 1.25h2.978a.625.625 0 0 0 0-1.25h-.871V7c0-.897-.728-1.625-1.625-1.625z"/>
                </svg>
            </button>
            </Link>
        
      {/* FORM FOR SUBMITTING THE CLAIM ADDRESS */}
      <form className="w-full h-[26vh] flex flex-col items-center justify-center ">

    
        <input
          placeholder="Enter Claim address here..."
          style={{fontFamily: "var(--font-inter-bold)", color: "black", fontSize: "calc(.75rem + 0.5vw)" }}
          className="h-[calc(2.0rem+5vw)] w-[95%] sm:w-[75%] bg-white rounded-[4rem] pl-[1.5rem] pr-1 z-1 mt-10 "
        ></input>

        <button className="h-[calc(2.0rem+5vw)] w-[calc(3rem+18vw)] bg-[rgba(255,255,255,0.2)] rounded-[5rem] mr-1 mt-4 ml-1 backdrop-blur-[40px] z-1 border-2 border-[rgba(255,255,255,0.2)]" style={{fontSize: "calc(1.2rem + 0.5vw)", fontFamily: "var(--font-inter-bold)"}}>
          Submit{" "}
        </button>
      </form>

      <div className="w-full h-[25vh] p-4 flex items-center justify-center z-10">
        <div>This product was not directly developed by Seek Now LLC</div>
      </div>
    </div>
  );
  }
export default MainHomePageBody;
