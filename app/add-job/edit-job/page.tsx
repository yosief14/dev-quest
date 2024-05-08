import Header from "@/components/Header"
import AddJobForm from "../AddJobForm"
import { Separator } from "@/components/ui/separator"
import { JobFormInterface } from "@/interfaces/jobFormInterface"

export default function EditJob({ jobData }: JobFormInterface) {
    // const url = useSearchParams()
    // const test = url?.getAll("postTitle") // Pass the "name" argument to the getAll method
    // console.log("🚀 ~ EditJob ~ test:", JSON.stringify(test))
    return (
        <>
            <Header />
            <div className="top-7 gap-10 flex w-11/12 sm:w-fit bg-white relative rounded-lg border-opacity-40 shadow-xl p-7 flex-col items-center">
                <h1 className={`text-2xl font-bold text-center`}>Add a Job</h1>
                <Separator />
                <AddJobForm edit={true} jobData={jobData} ></AddJobForm>
            </div>
        </>
    )
}
