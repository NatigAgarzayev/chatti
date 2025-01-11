'use client'
import { Team } from '@/types'
import React from 'react'
import TeamCard from './TeamCard'
import CreateTeam from './CreateTeam'

export default function TeamList({ teams, user }: { teams: Team[], user: any }) {
    return (
        <div>

            <h2 className='text-xl font-bold dark:text-gray-300'>{user.username}'s teams</h2>
            <div className='mt-3'>
                <CreateTeam userId={user.id} userName={user.username || ''} />
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
