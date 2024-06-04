import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex items-stretch h-screen">
            <Sidebar />
            {children}
        </main>
    )
}
