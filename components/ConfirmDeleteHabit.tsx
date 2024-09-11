'use client'
import { deleteHabit } from '@/api/habitClient'
import { useStore } from '@/store/store'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ConfirmDeleteHabit() {

    const router = useRouter()

    const [loadingDelete, setLoadingDelete] = useState(false)

    const confirmDeleteModal = useStore(state => state.confirmDeleteHabitModal)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)

    const habitId = useStore(state => state.modalId)

    const deleteHandler = async () => {
        setLoadingDelete(true)
        await deleteHabit({ id: habitId })
        setLoadingDelete(false)
        updateConfirmDeleteModal(false)
        router.refresh()
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
                        <div className="flex gap-6 justify-center">
                            <button disabled={loadingDelete} onClick={deleteHandler} className='px-4 py-2 bg-red-600 text-white font-bold rounded-3xl disabled:bg-red-300' >{loadingDelete ? "Processing..." : "Delete"}</button>
                            <button className='font-bold dark:text-white' onClick={() => updateConfirmDeleteModal(false)}>Cancel</button>
                        </div>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
