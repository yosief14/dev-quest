import React, { FC, useEffect, useState } from "react";
import Image from "next/image";


interface InputProps {
    icon: string;
    placeholder?: string;
    jobFilter: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;

}

const Input: FC<InputProps> = ({ icon, placeholder, jobFilter, handleSearch }: InputProps) => {
    const filter = jobFilter

    return (
        <label className="flex relative w-full items-center">
            <Image alt="search Icon" src={icon} className="relative px-2 h-[22px] w-auto items-center" ></Image>
            <input type="text" className="  h-10 ring-0 w-full outline-none pl-2 text-base" placeholder={placeholder ? placeholder : "Missing Place holder"} onChange={e => handleSearch(e, jobFilter)} />

        </label>
    )
}

export default Input