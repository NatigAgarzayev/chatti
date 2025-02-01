'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/store'
import { useMutation, useMutationState, useQueryClient } from '@tanstack/react-query'
import { joinTeamByCode } from '@/api/teamClient'
import { useUser } from '@clerk/nextjs'

export default function JoinTeam() {

    const joinTeamModal = useStore((state) => state.joinTeamModal)
    const updateJoinTeamModal = useStore((state) => state.updateJoinTeamModal)
    const queryClient = useQueryClient()
    const { user } = useUser()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ user, teamCode }: { user: any, teamCode: string }) => {
            updateJoinTeamModal(true)
            await joinTeamByCode(user, teamCode)
            updateJoinTeamModal(false)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['teams'] })
        }
    })

    const joinTeamHandler = async (formData: FormData) => {
        const teamCode = formData.get('teamCode') as string
        mutate({ user, teamCode })
    }

    return (
        <>
            <button onClick={() => updateJoinTeamModal(true)} className='px-4 py-2 bg-white border border-gray-300 dark:border-white text-gray-700 font-bold rounded-3xl dark:bg-transparent dark:text-white disabled:bg-indigo-200' type='submit'>Join to the team</button>
            <Dialog open={joinTeamModal} onClose={() => updateJoinTeamModal(false)} className="relative z-50">
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
                            <DialogTitle className="font-bold text-xl dark:text-white">Join to the team</DialogTitle>
                            <form action={joinTeamHandler} className="flex flex-col gap-3 justify-center">
                                <input name='teamCode' type="text" maxLength={30} placeholder='Invitation code' className='px-4 py-2 border border-gray-300 rounded-3xl' />
                                <button disabled={isPending} type='submit' className='text-gray-700 px-4 py-2 dark:bg-gray-100 bg-indigo-400 font-bold rounded-3xl disabled:bg-indigo-300' >{isPending ? 'Joining...' : 'Join'}</button>
                                <button className='px-4 py-2 font-bold border border-gray-300 rounded-3xl  dark:text-white' onClick={() => updateJoinTeamModal(false)}>Cancel</button>
                                {
                                    isError &&
                                    <span className='text-red-500'>Something went wrong</span>
                                }
                            </form>
                        </DialogPanel>
                    </motion.div>
                </div>
            </Dialog >
        </>
    )
}