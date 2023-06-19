import React, { FC, useEffect, useState } from "react";
import Input from "@/components/Input";
import SearchBar from "@/components/SearchBar";
import searchIcon from "@/public/icon-search.svg";
import sunIcon from "@/public/icon-sun.svg";
import JobCard from "@/components/JobCard";
import Jobs from "@/pages/api/data.json";
export default function Home() {
  const homeSearchBarinputs = [
    { id: "1", icon: searchIcon, placeholder: "Filter by title..." },
    { id: "2", icon: sunIcon, placeholder: "Filter by location..." },
  ];

  return (
    <div className="flex justify-center static">
      <div className=" w-5/6 top-[100px] relative">
        <SearchBar inputList={homeSearchBarinputs} />
        <div className="grid gap-5 gap-y-10   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 top-[132px] relative">
          {Jobs.map((job) => (
            <JobCard
              key={job.id}
              id = {job.id.toString()}
              jobTitle={job.position}
              jobType={job.contract}
              location={job.location}
              company={job.company}
              postedDays={job.postedAt}
              logo={job.logo}
              logoBackground={job.logoBackground}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
