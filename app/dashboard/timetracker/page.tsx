import ClockTabs from '@/components/ClockTabs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    const user = await currentUser()

    if (!user) {
        return redirect('/sign-in')
    }


    return (
        <div className='p-4 w-full h-full relative dark:bg-gray-900'>
            <ClockTabs />
        </div>
    )
}
