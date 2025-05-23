'use client'
import { deleteHabit } from '@/api/habitClient'
import { useHabit, useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ConfirmDeleteHabit() {

    const confirmDeleteModal = useStore(state => state.confirmDeleteHabitModal)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)

    const habitId = useStore(state => state.modalId)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            await deleteHabit({ id: id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] })
            updateConfirmDeleteModal(false)
        }
    })

    const deleteHandler = async () => {
        mutation.mutate(habitId)
    }

    return (
        <Dialog open={confirmDeleteModal} onClose={() => updateConfirmDeleteModal(false)} className="relative z-50">
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
                        <DialogTitle className="font-bold text-xl dark:text-white">Delete?</DialogTitle>
                        <form className="flex gap-6 justify-center">
                            <button disabled={mutation.isPending} onClick={deleteHandler} className='px-4 py-2 bg-red-600 text-white font-bold rounded-3xl disabled:bg-red-300' >{mutation.isPending ? "Processing..." : "Delete"}</button>
                            <button className='font-bold dark:text-white' onClick={() => updateConfirmDeleteModal(false)}>Cancel</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
