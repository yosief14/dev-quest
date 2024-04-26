import Link from 'next/link'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
export default function NewJobCard() {
    return (
        <main
            className={` top-[50px] relative translate-y-[-50px] animate-in duration-500 col-span-3 mb-9 flex flex-col items-center w-full mt-10 h-[50px] sm:h-[90px]`}
        >
            <Link href="/add-job" className='mx-auto p-7 rounded-lg'>
                <Button className='bg-dev-blue'>
                    <Plus className='mr-3' size={24} />
                    Add New Job</Button>
            </Link>
        </main>
    )
}
