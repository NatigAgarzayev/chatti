'use client'
import { createTeam } from '@/api/teamClient'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React from 'react'

export default function CreateTeam({ userId, userName }: { userId: string, userName: string }) {

    const createTeamModal = useStore(state => state.createTeamModal)
    const updateCreateTeamModal = useStore(state => state.updateCreateTeamModal)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ teamName, userId, participant_name }: { teamName: string, userId: string, participant_name: string }) => {
            await createTeam(teamName, userId, participant_name)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] })
            updateCreateTeamModal(false)
        }
    })

    const createTeamHandler = (formData: FormData) => {
        const teamName = formData.get('teamName') as string
        mutation.mutate({
            teamName: teamName,
            userId: userId,
            participant_name: userName
        })
    }

    return (
        <>
            <button onClick={() => updateCreateTeamModal(true)} className='px-4 py-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl dark:bg-gray-100 disabled:bg-indigo-200' type='submit'>Create a team</button>
            <Dialog open={createTeamModal} onClose={() => updateCreateTeamModal(false)} className="relative z-50">
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
                        <DialogPanel className="md:w-[520px] w-[340px] space-y-4 border bg-white dark:bg-gray-800 dark:border-gray-400 p-6 rounded-3xl text-center">
                            <DialogTitle className="font-bold text-xl dark:text-white">Create a team</DialogTitle>
                            <form action={createTeamHandler} className="flex flex-col gap-3 justify-center">
                                <input name='teamName' type="text" maxLength={30} placeholder='Team name' className='px-4 py-2 border border-gray-300 rounded-3xl' />
                                <button disabled={mutation.isPending} type='submit' className='text-gray-700 px-4 py-2 dark:bg-gray-100 bg-indigo-400 font-bold rounded-3xl disabled:bg-indigo-300' >{mutation.isPending ? 'Creating...' : 'Create'}</button>
                                <button className='px-4 py-2 font-bold border border-gray-300 rounded-3xl  dark:text-white' onClick={() => updateCreateTeamModal(false)}>Cancel</button>
                            </form>
                        </DialogPanel>
                    </motion.div>
                </div>
            </Dialog>
        </>

    )
}
