import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

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
  console.log(icon)
  return (
    <Link href={`/jobPosts/${id}`}>
      <div className="  bg-white rounded p-7">
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
      </div>
    </Link>
  );
};

export default JobCard;
