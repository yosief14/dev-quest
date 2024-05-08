'use client'
import Link from 'next/link'
export default function EditButton(jobData?: any) {
    return (
        <Link href={{
            pathname: `/add-job/edit-job`,
            query: {
                id: jobData.id,
                positionTitle: jobData.positionTitle,
                companySite: jobData.companySite,
                postDate: jobData.postDate,
                appclicationDate: jobData.appclicationDate,
                postedDays: jobData.postedDays,
                applicationDate: jobData.applicationDate,
                company: jobData.company,
                location: jobData.location
            },
        }}>
            <button className="w-32   text-lg self-center p-[3px] absolute bottom-7 right-7">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Edit
                </div>
            </button>
        </Link>
    )
}