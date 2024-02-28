import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen h- flex-col items-center justify-between p-24 ${inter.className}`}
    >
    </main>
  )
}
