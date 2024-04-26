import jobPost from "@/app/api/data.json";
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
    const postData = await jobPost.find((post: any) => {
        return post.id === Number(id)
    });
    return postData;
}

export default { getPostData, getPostIdList, getPostIdListForParam };