"use client";
import Image from "next/image";
import Link from "next/link";
// import DarkModeSwitcher from "../DarkModeSwitcher/DarkModeSwitcher";

const Header = () => {
  return (
    // <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
    //   <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
    //     <div className="flex items-center gap-2 sm:gap-4">
    //       <Link className="block flex-shrink-0" href="/dashboard/surveys">
    //         <Image
    //           width={32}
    //           height={32}
    //           src={"/images/logo/logo-icon.svg"}
    //           alt="Logo"
    //         />
    //       </Link>
    //     </div>

    //     <div className="hidden sm:block w-full mx-12">
    //       <ul className="unstyled">
    //         <li>
    //           <Link href="/dashboard/surveys/create">Create a Survey</Link>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="flex items-center gap-3 2xsm:gap-7">
    //       <ul className="flex items-center gap-2 2xsm:gap-4">
    //         <DarkModeSwitcher />
    //       </ul>
    //     </div>
    //   </div>
    // </header>
    // <body class="bg-[#F3F3F3]">
    <header className="mt-[30px] mx-[80px] grid grid-cols-2">
      <div className="text-4xl">
        <h1>
          Survey<span className="text-[#0159C9]">Up</span><span>!</span>
        </h1>
      </div>
      {/* <div className="justify-self-end static">
        <button
          className="px-[15px] py-[10px] rounded-[10px] text-white bg-gradient-to-r from-[#0751c1] to-[#2e6be2]">
          Create survey
        </button>
      </div> */}
    </header>
  );
};

export default Header;
