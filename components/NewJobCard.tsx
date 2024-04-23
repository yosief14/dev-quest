import Link from 'next/link'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
export default function () {
    return (
        <main
            className={` flex flex-col items-center w-full mt-10 h-[50px] sm:h-[90px]`}
        >
            <Link href="/add-job" className='mx-auto p-7 rounded-lg'>
                <Button className='bg-dev-blue'>
                    <Plus className='mr-3' size={24} />
                    Add New Job</Button>
            </Link>
        </main>
    )
}
