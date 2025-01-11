'use client'
import React from 'react'
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'
import { getUserTeam } from '@/api/teamClient'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import TeamList from './TeamList'
import MainSkeleton from './MainSkeleton'

export default function Team({ user }: { user: any }) {

    const { data: teams, isLoading: teamLoading } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const teams = await getUserTeam(user.id)
            return teams
        },
        enabled: !!user
    })

    if (teamLoading) {
        return (
            <div className='flex w-full h-screen bg-white dark:bg-gray-900'>
                <MainSkeleton />
            </div>
        )
    }


    return (
        <div className='p-4 w-full h-full relative dark:bg-gray-900'>
            {
                teams && teams.length > 0 ? (
                    <div>
                        <TeamList teams={teams} user={user} />
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
