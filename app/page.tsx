import { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import Home from '@/components/Home'
export const metadata: Metadata = {
    title: 'Dev-Quest',
}

const inter = Inter({ subsets: ['latin'] })
const poppins = Outfit({ subsets: ['latin'] })

export default function Page() {
    return (
        <main
            className={`flex  relative flex-col bg-container-grey ${poppins.className}`}
        >
            <Home />
        </main>
    )
} 