'use client'

import { getUserTeamById } from '@/api/teamClient'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import TeamDashboardContent from './TeamDashboardContent'

export default function TeamDashboard() {
    const params = useParams()
    const { userId } = useAuth()


    const { data: team, isLoading } = useQuery({
        queryKey: ['teams', params.slug],
        queryFn: async () => {
            try {
                const team = await getUserTeamById(params.slug as string, userId as string)
                return team
            } catch (error) {
                console.log(error)
            }
        },
        enabled: !!params.slug,
    })

    if (isLoading) {
        return <div className='flex items-center justify-center w-full h-screen'>Loading...</div>
    }

    return (
        team ? (
            <div className='w-full h-full bg-white dark:bg-gray-900'>
                <TeamDashboardContent team={team[0]} />
            </div>
        ) : (
            <>
                <div className='flex flex-col items-center justify-center w-full h-screen'>
                    You are not a participant of the team
                    <Link href={`/dashboard/team`} className='text-blue-500'>Go back</Link>
                </div>
            </>
        )
    )
}
