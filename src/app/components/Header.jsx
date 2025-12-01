import Link from "next/link";
const Header = () => {
  return (
    <div className="border-2 border-[rgba(255,255,255,0.2)] bg-transparent relative z-1 px-2">
    <div className="h-auto w-full lg:w-[60vw] mx-auto rounded-full shadow-2xl p-4 m-4 mt-8 border-2 border-[rgba(255,255,255,0.2)] flex" style={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5rem", padding: "1rem",
  }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-12 border-green-600 border-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>

        <h1 className="font-bold text-[calc(1.25rem+1vw)] tracking-wide leading-snug  border-red-500 border-2 ml-3 md:ml-0 md:border-none" style={{marginLeft: "1rem", fontFamily: "var(--font-momo)"}} >SMARTERSCOPE.AI</h1>

          <Link href="/instructions" style={{zIndex: 2}}>
            <button className="hidden md:flex md:flex-shrink-0 size-8 absolute right-4 top-1/2 -translate-y-1/2 border-green-600 border-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M7 .185c1.682 0 3.402.488 4.628 1.512c1.382 1.154 2.08 3.011 2.176 4.856s-.402 3.776-1.538 5.11C11.022 13.124 8.98 13.816 7 13.816s-4.022-.692-5.266-2.153C.598 10.329.099 8.398.196 6.553S.99 2.85 2.372 1.697C3.598.673 5.318.185 7 .185m.257 2.906c.345 0 .625.28.625.625v.323a.625.625 0 1 1-1.25 0v-.323c0-.345.28-.625.625-.625m-1.51 2.284a.625.625 0 0 0 0 1.25h.496c.207 0 .375.168.375.375v2.106H5.76a.625.625 0 1 0 0 1.25h2.978a.625.625 0 0 0 0-1.25h-.871V7c0-.897-.728-1.625-1.625-1.625z"/>
              </svg>
            </button>
          </Link>
    </div>
    </div>
  );
};

export default Header;
