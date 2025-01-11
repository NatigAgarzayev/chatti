'use client'

import { Team } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TeamCard({ team }: { team: Team }) {
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/dashboard/team/${team.team_id}`)} className='group relative cursor-pointer mt-4 md:w-[510px] w-[340px] border border-gray-200 dark:border-gray-700 rounded-3xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300'>
            <h2 className='text-xl text-gray-700 font-bold dark:text-gray-300'>{team.team_name}</h2>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>{team.participants.length} participant(s)</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className='stroke-gray-500 absolute top-1/2 -translate-y-1/2 right-4 dark:stroke-gray-400 dark:group-hover:stroke-gray-300 lucide lucide-chevron-right group-hover:translate-x-2 group-hover:stroke-gray-700 duration-300' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </div>
    )
}
