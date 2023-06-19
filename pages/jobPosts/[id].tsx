import { FC } from "react";
import getPost from "@/Services/getPost";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import CompanyIcon from "@/components/CompanyIcon";
import JobCard from "@/components/JobCard";
interface PostData {
  postData: {
    id: number;
    company: string;
    logo: string;
    logoBackground: string;
    position: string;
    postedAt: string;
    contract: string;
    location: string;
    website: string;
    apply: string;
    description: string;
    requirements: { content: string; items: [string] };
    role: { content: string; items: [string] };
  };
}

const jobPosts: FC<PostData> = ({ postData }: PostData) => {
  //needed to use leading /
  const icon = postData.logo ? `/${postData.logo}` : "/logo.svg";

  return (
    <div className="flex relative  justify-center rounded top-28">
      <div className="flex relative flex-col items-center justify-center ">
        <div className="flex bg-white h-[130px] items-center relative sm:w-11/12  md:w-[800px] rounded-xl  overflow-hidden">
          <div className="h-full w-[130px]">
            <CompanyIcon
              iconPath={icon}
              iconBackground={postData.logoBackground}
            />
          </div>
          <div className="flex flex-col pl-7">
            <h1 className="text-2xl font-bold">{postData.company}</h1>
            <div className="text-base text-dev-grey pt-2">
              {postData.website}
            </div>
          </div>

          <button className=" bg-dev-grey-blue text-dev-blue text-dev-size font-bold rounded-lg w-[142px] absolute px-6 py-3 left-[80%] ">
            Company Site
          </button>
        </div>
        <div className="flex bg-white rounded-xl mt-10 w-[800px] p-[48px]">
          <div className="flex items-center  ">
            <div className="flex-col">
              <div className="text-dev-grey">
                {postData.postedAt} • {postData.contract}
              </div>
              <div className="text-3xl font-bold top-1 relative">
                {" "}
                {postData.position}
              </div>
              <div className="text-dev-blue text-sm font-bold top-2 relative">
                {postData.location}
              </div>
            </div>
            <button className=" bg-dev-blue text-base text-white w-[142px] text-dev-size font-bold rounded-lg absolute px-6 py-3 left-[80%] ">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const data = await getPost.getPostData(params.id);
  const postData = data;
  return {
    props: {
      postData,
    },
  };
};

const getStaticPaths = async () => {
  const paths = await getPost.getPostIdList();
  return {
    paths,
    fallback: false,
  };
};

export { getStaticProps, getStaticPaths, jobPosts as default };
