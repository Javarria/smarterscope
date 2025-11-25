import Link from "next/link";
const Header = () => {
  return (
    <div
    style={{
        borderWidth: "2px",
        borderColor: "white",
        borderHeight: "auto",
        backgroundColor: "transparent",
        position: "relative", // normal flow inside container
        zIndex: 1,
        paddingRight: "1rem",
        paddingLeft: "1rem"
    }}
    >
    <div className="h-auto w-full lg:w-[60vw] mx-auto rounded-full shadow-2xl p-4 m-4 mt-8 border-2 border-amber-300 flex" style={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5rem", padding: "1rem",
  }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-10 border-green-600 border-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>

        <h1 className="font-bold text-2xl tracking-wide leading-snug  border-red-500 border-2 ml-3">SMARTERSCOPE.AI</h1>

        
    </div>
    </div>
  );
};

export default Header;
