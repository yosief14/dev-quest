import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";
import { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <html lang="en">
                <body className="relative h-screen w-full">{children}
                </body>
            </html>
        </>
    )
}


