import { getUserTeam } from '@/api/team'
import CreateTeam from '@/components/CreateTeam'
import JoinTeam from '@/components/JoinTeam'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    const user = await currentUser()

    if (!user) {
        return redirect('/sign-in')
    }

    const team = await getUserTeam(user.id) || []
    console.log(team)

    return (
        <div className='p-4 w-full h-full relative dark:bg-gray-900'>
            {
                team.length > 0 ? (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <h1 className='text-2xl font-bold'>You are in a team</h1>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <CreateTeam userId={user.id} userName={user.username || ''} />
                        <p className='text-gray-500 dark:text-gray-400'>or</p>
                        <JoinTeam />
                    </div>
                )
            }
        </div>
    )
}
