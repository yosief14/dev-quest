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
  const [jobs, setJobs] = useState(Array<any>); // Add type declaration for jobs array

  const dbJobs = useMemo(() => {
    return async () => {
      const requestJobs = await getJobPosts() as Array<any>;
      if (!requestJobs) {
        throw new Error("Post not found");
      }
      requestJobs.map((job) => {
        const url = new URL(job.companySite);
        const domain = url.hostname;
        job.logoBackground = "#F4F4F4";
        job.logo = `https://icons.duckduckgo.com/ip3/${domain.replace('www.', '')}.ico`;
        job.contract = 'Full Time'
        job.postedAt = '69d ago'
        job.position = job.positionTitle
      });
      setJobs(requestJobs)
    }

  }, []);
  useEffect(() => {
    dbJobs()
  }, []);

  const homeSearchBarinputs = [
    { id: "1", icon: searchIcon, placeholder: "Filter by title...", jobFilter: "position" },
    { id: "2", icon: locationIcon, placeholder: "Filter by location...", jobFilter: "location" },
  ];

  //! change keys to match the keys in the db
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
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <JobCard
                    key={job.id}
                    id={job.id.toString()}
                    jobTitle={job.positionTitle}
                    location={job.location}
                    company={job.company}
                    postedDays={job.postedAt}
                    logo={job.logo}
                    logoBackground={job.logoBackground}
                  /></motion.div>
              ))}
              {loadMore ? jobs.slice(jobs.length - 6, jobs.length).map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id.toString()}
                  jobTitle={job.positionTitle}
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
