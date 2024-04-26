"use client"
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import searchIcon from "@/public/icon-search.svg";
import JobCard from "@/components/JobCard";
import locationIcon from "@/public/icon-location.svg";
import Jobs from "@/app/api/data.json";
import { AnimatePresence } from "framer-motion";
import NewJobCard from "@/components/NewJobCard";
import Header from "./Header";
export default function Home() {


  const [loadMore, setLoadMore] = useState(false);
  const [jobs, setJobs] = useState(Jobs); // Add type declaration for jobs array
  const homeSearchBarinputs = [
    { id: "1", icon: searchIcon, placeholder: "Filter by title...", jobFilter: "position" },
    { id: "2", icon: locationIcon, placeholder: "Filter by location...", jobFilter: "location" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredJobs = Jobs.filter((job) => {
      if (key === "position") return job.position.toLowerCase().includes(searchValue);
      if (key === "location") return job.location.toLowerCase().includes(searchValue);
    });
    setJobs(filteredJobs);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col bg-container-grey items-center gap-10 pb-10">
        <div className="w-5/6">
          <SearchBar inputList={homeSearchBarinputs} handleSearch={handleSearch} />
          <NewJobCard />
          <div className="grid gap-5 gap-y-10   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20 ">
            <AnimatePresence>
              {jobs.slice(0, Jobs.length - 6).map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id.toString()}
                  jobTitle={job.position}
                  jobType={job.contract}
                  location={job.location}
                  company={job.company}
                  postedDays={job.postedAt}
                  logo={job.logo}
                  logoBackground={job.logoBackground}
                />
              ))}
              {loadMore ? Jobs.slice(Jobs.length - 6, Jobs.length).map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id.toString()}
                  jobTitle={job.position}
                  jobType={job.contract}
                  location={job.location}
                  company={job.company}
                  postedDays={job.postedAt}
                  logo={job.logo}
                  logoBackground={job.logoBackground}
                />)) : null}
            </AnimatePresence>
          </div>
        </div>
        {jobs.length <= Jobs.length - 6 ?
          <span className="opacity-70 text-lg relative my-10">
            No more jobs to show
          </span> :

          <button onClick={() => setLoadMore(!loadMore)} className=" bg-dev-blue text-lg  text-white font-bold rounded-lg px-6 py-3 w-[140px]">
            Load {loadMore ? "Less" : "More"}
          </button>
        }
      </div>
    </>
  );
}
