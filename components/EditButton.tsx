'use client'
import Link from 'next/link'
import { Job } from '@/types/Job'
import { Edit, Edit2 } from 'lucide-react'
export default function EditButton({ jobId }: { jobId: string }) {
    return (
        <Link
            className='absolute top-4 right-4 size-25 hover:text-dev-blue '
            href={{
                pathname: `/add-job/edit-job`,
                query: {
                    id: jobId,
                },
            }}
            target='_blank'>
            <Edit2 size={20} />
        </Link>
    )
}