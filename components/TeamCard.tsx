'use client'

import { useStore } from '@/store/store'
import { Team } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TeamCard({ team }: { team: Team }) {
    const { user } = useUser()
    const router = useRouter()
    const updateDeleteTeamModal = useStore(state => state.updateDeleteTeamModal)
    const updateDeleteTeamId = useStore(state => state.updateDeleteTeamId)
    const updateLeaveTeamModal = useStore(state => state.updateLeaveTeamModal)
    const updateLeaveTeamId = useStore(state => state.updateLeaveTeamId)
    const updateShowParticipantsModal = useStore(state => state.updateShowParticipantsModal)
    const updateShowParticipantsId = useStore(state => state.updateShowParticipantsId)
    const handleDeleteTeam = () => {
        updateDeleteTeamModal(true)
        updateDeleteTeamId(team.team_id)
    }

    const handleCreateJoinTeamCode = async () => {
        await navigator.clipboard.writeText(team.team_id)
    }

    const handleLeaveTheTeam = () => {
        updateLeaveTeamModal(true)
        updateLeaveTeamId(team.team_id)
    }

    const handleShowParticipants = () => {
        updateShowParticipantsId(team.team_id)
        updateShowParticipantsModal(true)
    }

    return (
        <div className='relative p-4 mt-4 md:w-[510px] w-[340px] border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'>
            <h2 className='text-xl text-gray-700 font-bold dark:text-gray-300'>{team.team_name}</h2>
            <p onClick={handleShowParticipants} className='mt-2 text-gray-500 cursor-pointer dark:text-gray-400 hover:underline'>{team.participants.length} participant(s)</p>
            <div className='flex items-center gap-3 mt-5'>
                <button onClick={() => router.push(`/dashboard/team/${team.team_id}`)} className='flex items-center gap-2 text-blue-500 rounded-md p-2 bg-gray-500/10 hover:bg-gray-500/20 transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className='stroke-gray-900 dark:stroke-gray-400 dark:hover:stroke-gray-300 lucide lucide-chevron-right hover:translate-x-1 hover:stroke-gray-700 duration-300' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                <button onClick={handleCreateJoinTeamCode} className='flex items-center gap-2 text-green-500 rounded-md p-2 bg-green-500/10 hover:bg-green-500/20 transition-all duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="M19 16v6" /><path d="M22 19h-6" /></svg>
                </button>


                {
                    user && team.team_lead_id === user.id ?
                        <>
                            <button className='flex items-center gap-2 text-blue-500 rounded-md p-2 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                            </button>
                            <button onClick={handleDeleteTeam} className='flex items-center gap-2 text-red-500 rounded-md p-2 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                            </button>
                        </>
                        :
                        <button onClick={handleLeaveTheTeam} className='flex items-center gap-2 text-red-500 rounded-md p-2 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-door-open"><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" /></svg>
                        </button>
                }
            </div>
        </div>
    )
}
