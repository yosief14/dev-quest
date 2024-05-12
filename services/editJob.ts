import { editJob } from "@/db/services/jobs";

export default async function handler(value: any, jobId: string) {
    try {
        const retValue = await editJob(value, jobId)
        return (JSON.stringify(retValue))
    } catch (e) {
        return (JSON.stringify(e))
    }
}