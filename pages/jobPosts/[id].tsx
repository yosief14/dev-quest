import {FC} from "react";
import getPost from "@/Services/getPost";
import JobPost from "@/components/JobPost";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

type PostData = {
    id: number;
    company: string;
    
}

const jobPost: FC = ({postData}: PostData): InferGetStaticPropsType<typeof getStaticProps> => {
    return <div>{}</div>
}

const getStaticProps: GetStaticProps = async ({params}: any) => {
    const postData = await getPost.getPostData(params.id);
    return {
        props: {
            postData,
        },
    }
}

const getStaticPaths = async () => {
    const paths = await getPost.getPostIdList( );
    return {
        paths,
        fallback: false,
    }
}

export {getStaticProps, getStaticPaths, jobPost};

