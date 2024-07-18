'use client'
import { createTask } from '@/api/kanbanClient'
import { useStore, useUser } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export default function CreateTask() {

    const createTaskModal = useStore(state => state.createTaskModal)
    const updateTaskModal = useStore(state => state.updateTaskModal)
    const createTaskLoading = useStore(state => state.createTaskLoading)
    const updateTaskLoading = useStore(state => state.updateTaskLoading)
    const user = useUser(state => state.user)
    const router = useRouter()
    const createTaskHandler = async (formData: FormData) => {
        const { task } = Object.fromEntries(formData)
        if (task.toString().trim() === "") {
            alert("Fill required input")
            return
        }
        updateTaskLoading(true)
        await createTask(task + '', user.id)
        router.refresh()
        updateTaskLoading(false)
        updateTaskModal(false)
    }

    return (
        <Dialog open={createTaskModal} onClose={() => updateTaskModal(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-3xl w-[370px]">
                    <DialogTitle className="text-gray-700 font-bold text-center text-xl">Create Task</DialogTitle>
                    <form action={createTaskHandler} className='min-w-40 w-full flex flex-col gap-4'>
                        {/* <textarea placeholder='Write smth' name="task" className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl'></textarea> */}
                        <input placeholder='max 52 letters' maxLength={52} type="text" name='task' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                        <button disabled={createTaskLoading} className='p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>{createTaskLoading ? "Process..." : "Create"}</button>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
