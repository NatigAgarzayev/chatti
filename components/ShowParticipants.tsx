'use client'
import { getTeamParticipants, leaveTeam } from '@/api/teamClient'
import { useStore } from '@/store/store'
import { Participant } from '@/types'
import { useAuth } from '@clerk/nextjs'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export default function ShowPaticipants() {

    const queryClient = useQueryClient()
    const { userId } = useAuth()
    const showParticipantsModal = useStore(state => state.showParticipantsModal)
    const updateShowParticipantsModal = useStore(state => state.updateShowParticipantsModal)
    const showParticipantsId = useStore(state => state.showParticipantsId)

    const { data, isLoading } = useQuery({
        queryKey: ['teams', showParticipantsId],
        queryFn: async () => {
            return await getTeamParticipants(showParticipantsId)
        }
    })

    const mutation = useMutation({
        mutationFn: async (participantId: string) => {
            await leaveTeam(participantId, showParticipantsId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams', showParticipantsId] })
            queryClient.invalidateQueries({ queryKey: ['teams'] })
        }
    })

    const handleKickTeammate = (participantId: string) => {
        mutation.mutate(participantId)
    }

    return (
        <Dialog open={showParticipantsModal} onClose={() => updateShowParticipantsModal(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <DialogPanel className="w-[340px] space-y-4 border bg-white dark:bg-gray-800 dark:border-gray-400 p-6 rounded-3xl text-center">
                        <DialogTitle className="font-bold text-xl dark:text-white">Participants List:</DialogTitle>
                        <ul>
                            {data ? data.participants.map((participant: Participant) => (
                                <li key={participant.id} className='flex items-center justify-between h-12 px-4 dark:text-white text-left p-2 rounded-md bg-indigo-500/20 mb-2'>
                                    <span>{participant.id === data.team_lead_id ? participant.name + " (Creator)" : participant.name}</span>
                                    {
                                        (participant.id !== data.team_lead_id && userId === data.team_lead_id) &&
                                        <button onClick={() => handleKickTeammate(String(participant.id))} className='flex items-center gap-2 text-red-500 rounded-md p-2 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    }
                                </li>
                            ))
                                :
                                isLoading ? <li className='text-gray-800 dark:text-gray-100'>Loading...</li> : <li className='text-gray-800 dark:text-gray-100'>No participants found</li>
                            }
                        </ul>
                        <div className="flex gap-6 justify-center">
                            <button className='font-bold dark:text-white' onClick={() => updateShowParticipantsModal(false)}>Close</button>
                        </div>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
