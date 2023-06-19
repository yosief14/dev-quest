import jobPost from "@/pages/api/data.json";

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



const getPostData = async (id: string) => {
    const postData = jobPost.find((post) => post.id.toString() === id);
    return postData;
}

export default {getPostData, getPostIdList};