'use client'
import AddJob from "../AddJobForm"
import { useSearchParams } from "next/navigation"

export default function EditJobForm() {
    const url = useSearchParams()
    if (!url) {
        console.error("No URLSearchParams found");
        return <></>
    }
    const jobId = url.get("id")
    if (!jobId) {
        console.error("No job ID found in URLSearchParams");
        return <></>
    }
    return (
        //Sacrificial type assertion to appease the typescript gods
        <AddJob edit={true} jobId={jobId} ></AddJob>
    )
}