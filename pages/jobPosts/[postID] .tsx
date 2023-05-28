import {FC} from "react";

interface jobPostProps {
    postID: string;
    jobTitle: string;
}

const jobPost: FC<jobPostProps> = ({postID, jobTitle}: jobPostProps) => {
    return <div>{postID}{jobTitle}</div>
}

export default jobPost;
