'use client'
import { deleteTask } from '@/api/kanbanClient'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ConfirmDeleteTask() {

    const router = useRouter()

    const [loadingDelete, setLoadingDelete] = useState(false)

    const confirmDeleteModal = useStore(state => state.confirmDeleteTaskModal)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteTaskModal)

    const taskId = useStore(state => state.modalId)

    const deleteHandler = async () => {
        setLoadingDelete(true)
        await deleteTask(taskId)
        setLoadingDelete(false)
        updateConfirmDeleteModal(false)
        router.refresh()
    }

    return (
        <Dialog open={confirmDeleteModal} onClose={() => updateConfirmDeleteModal(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-[340px] space-y-4 border bg-white p-6 rounded-3xl text-center">
                    <DialogTitle className="font-bold text-xl">Delete task?</DialogTitle>
                    <div className="flex gap-6 justify-center">
                        <button type='button' disabled={loadingDelete} onClick={deleteHandler} className='px-4 py-2 bg-red-600 text-white font-bold rounded-3xl disabled:bg-red-300' >{loadingDelete ? "Processing..." : "Delete"}</button>
                        <button className='font-bold' onClick={() => updateConfirmDeleteModal(false)}>Cancel</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
