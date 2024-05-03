import Link from 'next/link'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
export default function NewJobCard() {
    return (
        <main
            className={` relative translate-y-[-50px] animate-in duration-500 col-span-3 mb-9 flex flex-col items-center w-full mt-10 h-[50px] sm:h-[90px]`}
        >
            <Link href="/add-job" className='mx-auto rounded-lg'>
                <button className="w-52  mt-10 text-lg self-center p-[3px] relative">
                    <div className="absolute inset-0  bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Add a New Job
                    </div>
                </button>
            </Link>
        </main>
    )
}
