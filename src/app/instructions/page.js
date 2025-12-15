 "use client"
 import ColorBends from "../components/ColorBends"
 import Header from "../components/Header"
 import MainHomePageBody from "../components/MainHomePageBody"
export default function Instructions(){

    
    return(

        <div className="h-screen flex flex-col items-center justify-center">
        {/* Background animation */}
        <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
          <ColorBends />
        </div>

        <svg width="500" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="background:white">\n' +
      <rect x="70" y="50" width="360" height="200" fill="white" stroke="black" strokeWidth="2"/>\n' +
      <line x1="70" y1="150" x2="430" y2="150" stroke="black" strokeWidth="2"/>\n' +
        </svg>
    
        
        {/* HEADER CONTAINER / BEGGINING OF PAGE */}
        <div className="flex flex-col md:flex-row md:min-w-[1000px] justify-center w-full min-h-[25rem] mx-auto p-4 z-2" style={{gap: "1rem"}}>


            {/* Step 1 */}
            <div className="flex w-full md:w-1/3 sm:1/4 items-center justify-center ">
            <div className="border-2 border-white rounded-xl p-6 h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#ffffff" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/></svg>
                </div>
                <p>
                After receiving your route, PLEASE copy and paste the exact address provided in Maestro to avoid errors with the language model or Google Maps.
                </p>
            </div>
            </div>

            {/* Step 2 */}
            <div className="flex w-full md:w-1/3 items-center justify-center ">
            <div className="border-2 border-white rounded-xl p-6 h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#ffffff" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402c1.582 0 2.613.949 2.613 2.215c0 1.002-.6 1.667-1.287 2.43l-.096.107l-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705c0-.744-.557-1.236-1.313-1.236c-.843 0-1.336.615-1.336 1.306Z"/></svg>
                </div>
                <p>
                At this point, just sit tight! Everything else is handled for you. Behind the scenes, the system converts the address into geolocation data and sends it to the AI to generate your scope sheet.
                </p>
            </div>
            </div>

            {/* Step 3 */}
            <div className="flex w-full md:w-1/3 items-center justify-center">
            <div className="border-2 border-white rounded-xl p-6 h-full flex flex-col justify-center">
                <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" fill="#ffffff"><g fill="#ffffff"><path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237c0-.709-.563-1.195-1.348-1.195c-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121c1.594-.012 2.608.885 2.637 2.062c.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917c.024 1.459-1.277 2.396-2.93 2.396c-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066c.973.006 1.6-.563 1.588-1.354c-.006-.779-.621-1.318-1.541-1.318Z"/><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/></g></svg>
                </div>
                <p>
                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Waiting on understanding of BE development. Going to fill the text later !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                </p>
            </div>
            </div>

            </div>

            
                <p className="h-[calc(1.95rem+2vw)] p-6 w-auto text-white font-bold opacity-100 bg-[rgba(255,255,255,0.2)] rounded-[5rem] backdrop-blur-[40px] z-1 border-2 border-[rgba(255,255,255,0.2)] mt-6 flex items-center justify-center">
                    <a href="/" className="hover:underline">Return To Home Page</a>

                </p>


       </div>
      
      
      
      )
    }
    {/* <div className="flex flex-col md:flex-row items-center justify-center w-full h-[80vh] border-green-500 border-2  mx-auto">
        
        <div className="flex flex-col w-full md:w-[33.5%] h-auto mx-auto border-red-500 border-6 items-center justify-center">
        
        <div className="border-2 border-white rounded-xl mx-auto p-4 w-3/4 md:w-3/4" style={{height: "calc(50vh - 14rem)"}}>
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#ffffff" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/></svg>
            </div>
            <p style={{marginTop: "1.5rem"}}>After receiving your route, PLEASE copy and paste the exact address provided in Maestro to avoid errors with the language model or Google Maps.</p>
        </div>
        </div>
        




        <div className="w-full md:w-[33.5%] h-[30vh] border-red-500 border-6 px-4" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className="border-2 border-white rounded-xl mx-auto p-4 w-3/4">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="#ffffff" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402c1.582 0 2.613.949 2.613 2.215c0 1.002-.6 1.667-1.287 2.43l-.096.107l-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705c0-.744-.557-1.236-1.313-1.236c-.843 0-1.336.615-1.336 1.306Z"/></svg>
                </div>
                    <p style={{marginTop: "1.5rem"}} >At this point, just sit tight! Everything else is handled for you. Behind the scenes, the system converts the address into geolocation data and sends it to the AI to generate your scope sheet.</p>
            </div>
        </div>


        <div className="w-full md:w-[33.5%] h-[30vh] border-red-500 border-6 px-4" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className="border-2 border-white rounded-xl mx-auto p-4 w-3/4">
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" fill="#ffffff"><g fill="#ffffff"><path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237c0-.709-.563-1.195-1.348-1.195c-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121c1.594-.012 2.608.885 2.637 2.062c.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917c.024 1.459-1.277 2.396-2.93 2.396c-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066c.973.006 1.6-.563 1.588-1.354c-.006-.779-.621-1.318-1.541-1.318Z"/><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/></g></svg>
            </div>
                <p>At this point, just sit tight! Everything else is handled for you. Behind the scenes, the system converts the address into geolocation data and sends it to the AI to generate your scope sheet.</p>

            </div>
        </div>
    </div> */}
    // <div className="absolute top-0 left-0 w-full min-h-full inset-0 z-0" style={{ pointerEvents: "none" }}>
    //   <ColorBends />
    // </div>
    // </div>
    // <div className="w-screen min-h-screen relative border-blue-600 border-8">
    // {/* Background animation */}