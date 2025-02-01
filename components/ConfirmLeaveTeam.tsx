'use client'
import { leaveTeam } from '@/api/teamClient'
import { useStore } from '@/store/store'
import { useAuth } from '@clerk/nextjs'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

export default function ConfirmLeaveTeam() {

    const queryClient = useQueryClient()
    const leaveTeamId = useStore(state => state.leaveTeamId)
    const { userId } = useAuth()
    const leaveTeamModal = useStore(state => state.leaveTeamModal)
    const updateLeaveTeamModal = useStore(state => state.updateLeaveTeamModal)
    const mutation = useMutation({
        mutationFn: async (teamId: string,) => {
            await leaveTeam(userId as string, teamId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] })
        }
    })

    const deleteHandler = async () => {
        mutation.mutate(leaveTeamId)
        updateLeaveTeamModal(false)
    }

    return (
        <Dialog open={leaveTeamModal} onClose={() => updateLeaveTeamModal(false)} className="relative z-50">
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
                        <DialogTitle className="font-bold text-xl dark:text-white">Leave the Team?</DialogTitle>
                        <div className="flex gap-6 justify-center">
                            <button type='button' disabled={mutation.isPending} onClick={deleteHandler} className='px-4 py-2 bg-red-600 text-white font-bold rounded-3xl disabled:bg-red-300' >{mutation.isPending ? "Processing..." : "Leave"}</button>
                            <button className='font-bold dark:text-white' onClick={() => updateLeaveTeamModal(false)}>Cancel</button>
                        </div>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
