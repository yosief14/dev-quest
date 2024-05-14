import { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import Home from '@/components/Home'
import { getJobPosts } from '@/services/getJobs'
export const metadata: Metadata = {
    title: 'Dev-Quest',
}

const inter = Inter({ subsets: ['latin'] })
const poppins = Outfit({ subsets: ['latin'] })

async function dbJobs() {
    const requestJobs = await getJobPosts() as Array<any>;
    if (!requestJobs) {
        throw new Error("post not found");
    }
    return requestJobs
}
export default async function Page() {
    const jobs = await dbJobs()
    return (
        <main
            className={`flex  relative flex-col bg-container-grey ${poppins.className}`}
        >
            <Home jobsProp={jobs} />
        </main>
    )
} 