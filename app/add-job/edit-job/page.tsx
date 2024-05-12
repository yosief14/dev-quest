import Header from "@/components/Header"
import AddJobForm from "../AddJobForm"
import { Separator } from "@/components/ui/separator"
import { Job } from "@/types/Job"
import { JobFormInterface } from "@/interfaces/jobFormInterface"
import EditJobForm from "./EditJobForm"

export default function EditJob({ jobData }: { jobData: Job }) {
    return (
        <>
            <Header />
            <div className="top-7 gap-10 flex w-11/12 sm:w-fit bg-white relative rounded-lg border-opacity-40 shadow-xl p-7 flex-col items-center">
                <h1 className={`text-2xl font-bold text-center`}>Edit Job</h1>
                <Separator />
                <EditJobForm jobEntry={jobData} />
            </div>
        </>
    )
}
