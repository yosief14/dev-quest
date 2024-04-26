import getPost from "@/Services/getPost";
import jobsPosts from "@/app/api/data.json";
import CompanyIcon from "@/components/CompanyIcon";
import Header from "@/components/Header";
import { get } from "http";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
interface JobPostsProps {
    params: { id: string };
}
async function getJobPosts(id: string) {
    const results = await getPost.getPostData(id);
    return results;
};

export async function generateStaticParams() {
    const paths = await getPost.getPostIdListForParam();
    return paths;
};


export default async function JobPosts({ params }: JobPostsProps) {
    console.log("🚀 ~ JobPosts ~ params:", params.id)

    const postData = await getJobPosts(params.id);

    //needed to use leading /
    if (!postData) {
        throw new Error("Post not found");
    }
    const icon = postData.logo ? `/${postData.logo}` : "/logo.svg";

    return (
        <>
            <Header />
            <main className="bg-container-grey">
                <div className="flex  relative flex-col items-center gap-10 justify-center bottom-6 ">
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
                                {postData.requirements.items.map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => (
                                    <li key={index} className="text-xs"><span className="text-base pl-2">{item}</span></li>
                                ))}
                            </ul>
                        </section>
                        <section className="flex flex-col gap-6">
                            <h2 className="text-xl font-bold">What you will do</h2>
                            <p className="text-dev-grey">{postData.role.content}</p>
                            <ul className="list-decimal list-inside text-dev-grey space-y-4">
                                {postData.role.items.map((item: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined, index: Key | null | undefined) => (
                                    <li key={index} className="text-dev-blue font-bold"><span className="text-base text-dev-grey font-normal pl-2">{item}</span></li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <footer className=" flex justify-center w-full p-4">
                        <button className=" bg-dev-blue h-fit text-white text-xl font-bold rounded-lg px-10 py-3 ">
                            Apply Now
                        </button>
                    </footer>
                </div>
            </main >
        </>
    );
};

