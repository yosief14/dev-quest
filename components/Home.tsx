"use client"

import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import searchIcon from "@/public/icon-search.svg";
import JobCard from "@/components/JobCard";
import locationIcon from "@/public/icon-location.svg";
import Jobs from "@/app/api/data.json";
import { AnimatePresence, motion } from "framer-motion";
import { getJobPosts } from "@/services/getJobs";
import NewJobCard from "@/components/NewJobCard";
import Header from "./Header";

export default function Home() {
  const [loadMore, setLoadMore] = useState(false);
  const [jobs, setJobs] = useState(Array<any>); // add type declaration for jobs array
  const [filteredJobs, setFilteredJobs] = useState(Array<any>); // add type declaration for filteredJobs array
  useEffect(() => {
    async function dbJobs() {
      const requestJobs = await getJobPosts() as Array<any>;
      if (!requestJobs) {
        throw new Error("post not found");
      }
      setJobs(requestJobs)
      setFilteredJobs(requestJobs)
    }
    dbJobs()
  }, []);

  const homeSearchBarinputs = [
    { id: "1", icon: searchIcon, placeholder: "Filter by title...", jobFilter: "position" },
    { id: "2", icon: locationIcon, placeholder: "Filter by location...", jobFilter: "location" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredJobs = jobs.filter((job) => {
      console.log(key)
      if (key === "position") return job.positionTitle.toLowerCase().includes(searchValue);
      if (key === "location") return job.location.toLowerCase().includes(searchValue);
    });
    setFilteredJobs(filteredJobs);
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
              {filteredJobs.slice(0, Jobs.length - 6).map((job) => (
                <div className="translate-y-[-50px] animate-in duration-500 "
                  key={job.id}
                // initial={{ opacity: 0, y: 100 }}
                // transition={{ duration: 0.5 }}
                // exit={{ opacity: 0, y: -100 }}
                // animate={{ opacity: 1, y: 0 }}
                >
                  <JobCard
                    id={job.id.toString()}
                    positionTitle={job.positionTitle}
                    location={job.location}
                    company={job.company}
                    postedDays={job.postedAt}
                    companySite={job.companySite} /></div>
              ))}
              {loadMore && filteredJobs.length > 8 ? filteredJobs.slice(filteredJobs.length - 6, filteredJobs.length).map((job) => (

                <div
                  key={job.id}
                  className="translate-y-[-50px] animate-in duration-500 ">
                  <JobCard
                    id={job.id.toString()}
                    positionTitle={job.positionTitle}
                    location={job.location}
                    company={job.company}
                    postedDays={job.postedAt}
                    companySite={job.companySite} />
                </div>)) : null}
            </AnimatePresence>
          </div>
        </div>
        {filteredJobs.length <= 9 ?
          <span className="opacity-70 text-lg relative my-10">
            {jobs.length === 0 ? "No jobs yet" : "No more jobs to show"}
          </span> :

          <button onClick={() => setLoadMore(!loadMore)} className=" bg-dev-blue text-lg  text-white font-bold rounded-lg px-6 py-3 w-[140px]">
            Load {loadMore ? "Less" : "More"}
          </button>
        }
      </div>
    </>
  );
}
