import Sidebar from '@/components/Sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
import { auth } from '@clerk/nextjs/server';

export default async function layout({ children }: { children: React.ReactNode }) {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
        redirect("/sign-in")
    }
    else {
        return (
            <main className="flex items-stretch h-screen">
                <Sidebar />
                {children}
            </main>
        )
    }
}
