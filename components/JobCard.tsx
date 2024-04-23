import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"

interface JobCardProps {
  id?: string;
  postedDays?: string;
  jobType?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  logo?: string;
  logoBackground?: string;
}

const JobCard: FC<JobCardProps> = ({
  postedDays,
  jobType,
  jobTitle,
  company,
  location,
  logo,
  logoBackground,
  id,
}: JobCardProps) => {
  const icon = logo ? logo : "/logo.svg";
  return (
    <Link href={`/jobPosts/${id}`} >
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        initial={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="  bg-white rounded p-7">
        <div
          style={{ backgroundColor: logoBackground }}
          className="flex rounded-xl bottom-12 relative items-center justify-center h-11 w-11 p-1 "
        >
          <Image
            src={icon}
            alt="logo"
            width="1"
            height="1"
            className=" h-fit w-fit  "
          />
        </div>
        <div className="text-base text-dev-grey">
          {postedDays} • {jobType}
        </div>
        <h1 className="text-xl  font-bold pt-3">{jobTitle}</h1>
        <div className="text-base text-dev-grey pt-3">{company}</div>
        <div className="text-sm text-dev-blue font-bold pt-9">{location}</div>
      </motion.div>
    </Link>
  );
};

export default JobCard;
