'use client'
import { Team } from '@/types'
import React from 'react'
import TeamCard from './TeamCard'
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'

export default function TeamList({ teams, user }: { teams: Team[], user: any }) {
    return (
        <div>

            <h2 className='text-xl font-bold dark:text-gray-300'>{user.username}'s teams</h2>
            <div className='flex items-center gap-2 mt-3'>
                <CreateTeam userId={user.id} userName={user.username || ''} />
                <span className='text-gray-900 dark:text-gray-100'>
                    or
                </span>
                <JoinTeam />
            </div>
            <div className='flex flex-wrap gap-4'>
                {
                    teams.map((team) => (
                        <TeamCard key={team.team_id} team={team} />
                    ))
                }
            </div>
        </div>
    )
}
