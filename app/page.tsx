import { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import { Inter, Outfit } from 'next/font/google'
import Home from '@/components/Home'
export const metadata: Metadata = {
    title: 'My Page Title',
}

const inter = Inter({ subsets: ['latin'] })
const poppins = Outfit({ subsets: ['latin'] })

export default function Page() {
    return (
        <main
            className={`flex  relative flex-col h-screen ${poppins.className}`}
        >
            <Home />
        </main>
    )
}