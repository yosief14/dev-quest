import getPost from "@/services/getPost";
import CompanyIcon from "@/components/CompanyIcon";
import Header from "@/components/Header";
import { jobs } from "@/db/schema";
import { db } from "@/db/db";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';
const poppins = Outfit({ subsets: ['latin'] })

interface JobPostsProps {
    params: { id: string };
}

export async function generateStaticParams() {
    const paths = await getJobPostParams();
    return paths;
};

async function getJobPostParams() {
    const result = await db.select({
        id: jobs.id,
    }).from(jobs)
    return result
}

export default async function JobPosts({ params }: JobPostsProps) {
    const job = await getPost.getPostData(params.id);
    if (!job) {
        notFound();
    }

    const url = new URL(job.companySite);
    const domain = url.hostname;
    const icon = `https://icons.duckduckgo.com/ip3/${domain.replace('www.', '')}.ico`;
    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if (
                domNode instanceof Element &&
                domNode.attribs &&
                domNode.attribs.class === 'remove'
            ) {
                return <></>;
            }
        },
    };
    const description = parse(job.description, options);
    return (
        <>
            <Header />
            <main className={`bg-container-grey ${poppins.className}`}>
                <div className="flex  relative flex-col translate-y-[-50px] top-[0]  animate-in duration-500  items-center gap-10 justify-center bottom-6 ">
                    <div className="flex flex-row justify-between bg-white h-[130px] items-center  sm:w-11/12  md:w-[800px] rounded-xl  overflow-hidden pr-[48px] ">
                        <div className="flex h-full flex-row items-center">
                            <div className=" h-full w-[130px] flex items-center justify-center">
                                <div className=" w-14 rounded-xl overflow-hidden relative">
                                    <CompanyIcon
                                        iconPath={icon}
                                        iconBackground={'#F4F4F4'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col pl-7">
                                <h1 className="text-2xl font-bold">{job.company}</h1>
                                <div className="text-base text-dev-grey pt-2">
                                </div>
                            </div>
                        </div>

                        <Link href={job.companySite} target='_blank' className=" bg-dev-grey-blue text-dev-blue text-dev-size font-bold rounded-lg  px-6 py-3 left-[80%] hover:bg-blue-300 ">
                            Company Site
                        </Link>
                    </div>
                    <div className=" flex flex-col bg-white rounded-xl w-[800px] p-[48px] gap-12 ">
                        <div className="flex-row flex justify-letween top-0 items-center">
                            <div className="flex-col w-fit ">
                                <span className="text-dev-grey">
                                </span>
                                <br />
                                <span className="text-3xl font-bold line-clamp-2 ">
                                    {job.positionTitle}
                                </span>
                                <br />
                            </div>
                            <Link href={job.positionLink} target='_blank' className=" ml-auto bg-dev-blue text-base h-fit whitespace-pre text-white font-bold rounded-lg px-6 py-3 ">
                                Apply Now
                            </Link>
                        </div>
                        <span className="text-dev-blue text-lg relative bottom-7 font-bold">
                            {job.location}
                            <Separator className="mt-5" />
                        </span>
                        <section >
                            <h2 className="text-xl text-black mb-5 font-bold">Job Description</h2>
                            {description}
                        </section>
                    </div>
                </div >
            </main >
        </>
    );
};

