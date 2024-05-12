'use client'
import { Job } from "@/types/Job"
import AddJob from "../AddJobForm"
import { useSearchParams } from "next/navigation"

function buildJobFromUrl(url: URLSearchParams) {
    const postDateFromUrl = url.get("postDate") || ''
    const applicationdateFromUrl = url.get("applicationDate") || ''
    return {
        id: url.get("id") || 'NO ID FOUND',
        company: url.get("company") || 'NO COMPANY FOUND',
        companySite: url.get("companySite") || 'NO COMPANY SITE FOUND',
        positionLink: url.get("positionLink") || 'NO POSITION LINK FOUND',
        positionTitle: url.get("positionTitle") || 'NO POSITION TITLE FOUND',
        postDate: new Date(parseInt(postDateFromUrl)),
        applicationDate: new Date(parseInt(applicationdateFromUrl)),
        location: url.get("location") || 'NO LOCATION FOUND',
        description: url.get("description") || 'NO DESCRIPTION FOUND'
    }

}
export default function EditJobForm({ jobEntry }: { jobEntry: Job }) {
    const url = useSearchParams()
    if (!url) {
        console.error("No URLSearchParams found");
        return <></>
    }
    const jobData = buildJobFromUrl(url)
    const newURL = new URLSearchParams(url)
    return (
        //Sacrificial type assertion to appease the typescript gods
        <AddJob edit={true} jobData={jobData} ></AddJob>
    )
}