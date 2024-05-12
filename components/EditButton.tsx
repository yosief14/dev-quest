'use client'
import Link from 'next/link'
import { Job } from '@/types/Job'
import { Edit, Edit2 } from 'lucide-react'
export default function EditButton({ jobData }: { jobData: Job }) {
    return (
        <Link
            className='absolute top-4 right-4 size-25 hover:text-dev-blue '
            href={{
                pathname: `/add-job/edit-job`,
                query: {
                    id: jobData.id,
                    positionTitle: jobData.positionTitle,
                    positionLink: jobData.positionLink,
                    companySite: jobData.companySite,
                    postDate: jobData.postDate,
                    applicationDate: jobData.applicationDate,
                    company: jobData.company,
                    location: jobData.location,
                    description: jobData.description
                },
            }}
            target='_blank'>
            <Edit2 size={20} />
        </Link>
    )
}