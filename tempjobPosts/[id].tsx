import { FC } from "react";
import getPost from "@/services/getPost";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import CompanyIcon from "@/components/CompanyIcon";
import JobCard from "@/components/JobCard";
import { motion } from "framer-motion";
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
    <main className="bg-container-grey">
      <motion.div className="flex  relative flex-col items-center gap-10 justify-center mt-20 "
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="flex flex-row justify-between bg-white h-[130px] items-center  sm:w-11/12  md:w-[800px] rounded-xl  overflow-hidden pr-[48px] ">
          <div className="flex h-full flex-row items-center">
            <div className=" h-full w-[130px]">
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
          </div>

          <button className=" bg-dev-grey-blue text-dev-blue text-dev-size font-bold rounded-lg  px-6 py-3 left-[80%] hover:bg-blue-300 ">
            Company Site
          </button>
        </div>
        <div className=" flex flex-col bg-white rounded-xl w-[800px] p-[48px] gap-12 leading-7">
          <div className="flex-row flex justify-between items-center">
            <div className="flex-col w-fit ">
              <span className="text-dev-grey">
                {postData.postedAt} • {postData.contract}
              </span>
              <br />
              <span className="text-3xl font-bold ">
                {postData.position}
              </span>
              <br />
              <span className="text-dev-blue text-sm font-bold">
                {postData.location}
              </span>
            </div>
            <button className=" bg-dev-blue text-base h-fit text-white text-dev-size font-bold rounded-lg px-6 py-3 ">
              Apply Now
            </button>
          </div>
          <p className="text-dev-grey">{postData.description}</p>
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Requirements</h2>
            <p className="text-dev-grey ">{postData.requirements.content}</p>
            <ul className="list-disc list-inside text-dev-grey space-y-4">
              {postData.requirements.items.map((item, index) => (
                <li key={index} className="text-xs"><span className="text-base pl-2">{item}</span></li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">What you will do</h2>
            <p className="text-dev-grey">{postData.role.content}</p>
            <ul className="list-decimal list-inside text-dev-grey space-y-4">
              {postData.role.items.map((item, index) => (
                <li key={index} className="text-dev-blue font-bold"><span className="text-base text-dev-grey font-normal pl-2">{item}</span></li>
              ))}
            </ul>
          </section>
        </div>

        <footer className=" mt-10  flex justify-center bg-white w-full p-4">
          <div className="w-[800px] flex flex-row justify-between">
            <div className="flex flex-col  gap-2">
              <h2 className="text-xl font-bold">{postData.position}</h2>
              <p className="text-dev-grey">{postData.company}</p>
            </div>
            <button className=" bg-dev-blue text-base h-fit text-white text-dev-size font-bold rounded-lg px-6 py-3 ">
              Apply Now
            </button>
          </div>
        </footer>


      </motion.div>
    </main >
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
