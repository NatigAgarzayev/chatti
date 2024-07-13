'use client'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { ReactElement } from 'react'

export default function CreateHabit({ children }: { children: ReactElement }) {
    const createModalCondition = useStore(state => state.createModal)
    const updateCreateModal = useStore(state => state.updateCreateModal)

    return (
        <>
            <button onClick={() => {
                updateCreateModal(true)
            }} className='w-14 h-14 flex justify-center items-center my-auto border-gray-700 rounded-full bg-gray-100 hover:bg-gray-200'>+</button>
            <Dialog open={createModalCondition} onClose={() => updateCreateModal(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-3xl">
                        <DialogTitle className="text-gray-700 font-bold text-center text-xl">Create habit</DialogTitle>
                        {/* <input value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-600' type="text" name='habit' /> */}
                        <div className='w-80'>
                            {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
                            {/* {React.cloneElement(children, { title: title })} */}
                            {children}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
