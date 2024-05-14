import Header from "@/components/Header"
import { Separator } from "@/components/ui/separator"
import EditJobForm from "./EditJobForm"
import { Suspense } from "react"

export default function EditJob() {
    return (
        <>
            <Header />
            <div className="top-7 gap-10 flex w-11/12 sm:w-fit bg-white relative rounded-lg border-opacity-40 shadow-xl p-7 flex-col items-center">
                <h1 className={`text-2xl font-bold text-center`}>Edit Job</h1>
                <Separator />
                <Suspense>
                    <EditJobForm />
                </Suspense>
            </div>
        </>
    )
}
