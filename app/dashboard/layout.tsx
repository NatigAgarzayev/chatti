import { getUserData } from '@/api/auth'
import Sidebar from '@/components/Sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
    const userData = await getUserData()

    if (!userData) {
        // redirect("/login")
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
