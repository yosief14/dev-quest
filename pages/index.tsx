import Image from 'next/image'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Outfit({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between p-24 ${poppins.className}`}
    >
    </main>
  )
}
