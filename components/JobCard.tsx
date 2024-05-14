import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import EditButton from "@/components/EditButton";
import { Edit } from "lucide-react";
import { Job } from "@/types/Job";

export default function JobCard({ jobEntry }: { jobEntry: Job }) {
  //TODO add tagging feature for application status
  //TODO add function to calculate the days since the job was posted
  const url = new URL(jobEntry.companySite);
  const domain = url.hostname;
  const logoBackground = "#F4F4F4";
  const icon = `https://icons.duckduckgo.com/ip3/${domain.replace('www.', '')}.ico`;
  const postedDays = '1 day ago'
  return (
    <>
      <Link href={`/jobPosts/${jobEntry.id}`} >
        <div
          className="  bg-white rounded p-4">
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
            {postedDays}
          </div>
          <h1 className="text-xl line-clamp-1 font-bold pt-3">{jobEntry.positionTitle}</h1>
          <div className="text-base text-dev-grey pt-3">{jobEntry.company}</div>
          <div className="text-sm text-dev-blue font-bold pt-9">{jobEntry.location ? jobEntry.location : 'Remote'}</div>
        </div>
      </Link >
      <EditButton jobId={jobEntry.id} />
    </>
  );
};

