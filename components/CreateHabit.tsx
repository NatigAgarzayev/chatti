'use client'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'

export default function CreateHabit({ children }: { children: ReactElement }) {
    const createModalCondition = useStore(state => state.createModal)
    const updateCreateModal = useStore(state => state.updateCreateModal)

    return (
        <>
            <button onClick={() => {
                updateCreateModal(true)
            }} className=' w-14 h-14 text-2xl text-gray-700 flex justify-center items-center my-auto border-gray-700 rounded-full bg-gray-100 hover:bg-gray-200'>+</button>
            <Dialog open={createModalCondition} onClose={() => updateCreateModal(false)} className="relative z-50">
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
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-3xl dark:bg-gray-800">
                            <DialogTitle className="text-gray-700 font-bold text-center text-xl dark:text-gray-100">Create habit</DialogTitle>
                            <div className='w-80'>
                                {children}
                            </div>
                        </DialogPanel>
                    </motion.div>
                </div>
            </Dialog>
        </>
    )
}
