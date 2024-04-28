'use client'
import { Toaster } from "@/components/ui/toaster"

export default function AddJobLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className='h-screen flex flex-col items-center bg-container-grey'>{children}
        <Toaster />
    </section>
}