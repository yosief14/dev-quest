import jobPost from "@/app/api/data.json";
import { db } from "@/db/db";
import { jobs } from "@/db/schema";
import { eq } from "drizzle-orm";

const getPostIdList = async () => {
    const postIds: { params: { id: string; }; }[] = [];
    jobPost.map((job) => {
        postIds.push({
            params: {
                id: job.id.toString(),
            },
        });
    });
    return postIds;
}

const getPostIdListForParam = async () => {
    const postIds: { id: string }[] = [];
    jobPost.map((job) =>
        postIds.push({
            id: job.id.toString()
        })
    );
    return postIds;
}



const getPostData = async (id: string) => {
    const retJob = await db.select().from(jobs).where(eq(jobs.id, id))
    return retJob[0]
}

export default { getPostData, getPostIdList, getPostIdListForParam };