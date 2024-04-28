import Header from "@/components/Header"
import SignOutButton from "@/components/SignOut"
import AddJobForm from "./AddJobForm"
import { Separator } from "@/components/ui/separator"

export default function AddJob() {

    return (
        <>
            <Header />
            <div className="top-7 gap-10 flex w-11/12 sm:w-fit bg-white relative rounded-lg border-opacity-40 shadow-xl p-7 flex-col items-center">
                <h1 className={`text-2xl font-bold text-center`}>Add a Job</h1>
                <Separator />
                <AddJobForm></AddJobForm>
            </div>
        </>
    )
}
