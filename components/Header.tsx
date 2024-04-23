'use client'
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import desktopBanner from "@/public/bg-pattern-header.svg";
import mobileBanner from "@/public/bg-pattern-header-mobile.svg";
import moonIcon from "@/public/icon-moon.svg";
import sunIcon from "@/public/icon-sun.svg";
import Link from "next/link";
const Header: FC = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const matchQueryList = window.matchMedia("(max-width: 42rem)");

    function handleChange(e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) {
      setIsMobileView(e.matches);
    }

    matchQueryList.addEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex bg-container-grey">
      <Image
        alt="Header Logo"
        src={isMobileView ? mobileBanner : desktopBanner}
        className="w-screen h-[130px] bg-container-grey "
      ></Image>
      <Link href="/">
        <div className="text-white font-bold absolute text-3xl left-[8.33333333%] top-11 cursor-pointer hover:text-gray-300 ">devQuest</div>
      </Link>
      <div className="inline-flex items-center absolute right-[8.333333%]  top-[52px]">
        <Image alt="Sun Icon" src={sunIcon} className=" w-auto h-5 p-0.5 relative right-1"></Image>
        <label className="relative cursor-pointer">

          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-[48px] h-[24px] bg-white peer-focus:outline-none rounded-full peer-checked:after:translate-x-6 after:absolute after:top-[4px] after:left-[4px] after:bg-indigo-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
        </label>
        <Image alt="Moon Icon" src={moonIcon} className=" w-auto h-4 p-0.5 relative left-1"></Image>
      </div>
    </div>
  );
};

export default Header;
