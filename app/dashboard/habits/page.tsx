import React from 'react'
import Habits from '@/components/Habits'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
export default async function page() {
    const user = await currentUser()

    if(!user) {
        return redirect('/sign-in')
    }

    return (
        <>
            <Habits user={JSON.parse(JSON.stringify(user))}/>
        </>
    )
}