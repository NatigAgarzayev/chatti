import { getUserTeam } from '@/api/team'
import CreateTeam from '@/components/CreateTeam'
import JoinTeam from '@/components/JoinTeam'
import Team from '@/components/Team'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    const user = await currentUser()

    if (!user) {
        return redirect('/sign-in')
    }

    return (
        <Team user={JSON.parse(JSON.stringify(user))} />
    )
}
