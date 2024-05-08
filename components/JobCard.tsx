import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import EditButton from "@/components/EditButton";
import { Edit } from "lucide-react";

interface JobCardProps {
  id?: string;
  positionTitle?: string;
  companySite: string;
  postDate?: string;
  appclicationDate?: string;
  postedDays?: string;
  applicationDate?: string;
  company: string;
  location?: string;
}

const JobCard: FC<JobCardProps> = ({
  id,
  positionTitle,
  companySite,
  postDate,
  appclicationDate,
  postedDays,
  applicationDate,
  location,
  company,
}
  : JobCardProps) => {
  //TODO add tagging feature for application status
  //TODO add function to calculate the days since the job was posted
  const url = new URL(companySite);
  const domain = url.hostname;
  const logoBackground = "#F4F4F4";
  const icon = `https://icons.duckduckgo.com/ip3/${domain.replace('www.', '')}.ico`;
  return (
    <>
      <Link href={`/jobPosts/${id}`} >
        <div
          className="  bg-white rounded p-7">
          {/* <Link href={{
        pathname: `/add-job/edit-job`,
        query: {
          id: id,
          positionTitle: positionTitle,
          companySite: companySite,
          postDate: postDate,
          appclicationDate: appclicationDate,
          postedDays: postedDays,
          applicationDate: applicationDate,
          company: company,
          location: location
        },
      }}> */}
          {/* </Link> */}
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
          <h1 className="text-xl line-clamp-1 font-bold pt-3">{positionTitle}</h1>
          <div className="text-base text-dev-grey pt-3">{company}</div>
          <div className="text-sm text-dev-blue font-bold pt-9">{location ? location : 'Remote'}</div>
        </div>
      </Link >
      <EditButton />
    </>
  );
};

export default JobCard;
