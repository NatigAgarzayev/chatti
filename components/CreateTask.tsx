'use client'
import { createTask } from '@/api/kanbanClient'
import { useStore } from '@/store/store'
import { useAuth } from '@clerk/nextjs'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function CreateTask() {

    const { userId } = useAuth()
    const createTaskModal = useStore(state => state.createTaskModal)
    const updateTaskModal = useStore(state => state.updateTaskModal)
    const createTaskLoading = useStore(state => state.createTaskLoading)
    const updateTaskLoading = useStore(state => state.updateTaskLoading)
    const [quillText, setQuillText] = useState('')
    const router = useRouter()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (text: string) => {
            await createTask(text, userId + "")
        },
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    const createTaskHandler = async () => {
        if (quillText.toString().trim() === "") {
            alert("Fill required input")
            return
        }
        updateTaskLoading(true)
        mutation.mutate(quillText.toString())
        setQuillText('')
        updateTaskLoading(false)
        updateTaskModal(false)
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            // ['code-block']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'link',
        // 'code-block'
    ];

    return (
        <Dialog open={createTaskModal} onClose={() => updateTaskModal(false)} className="relative z-50">
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
                    <DialogPanel className="max-w-lg space-y-4 border bg-white dark:bg-gray-800 p-6 rounded-3xl w-[370px]">
                        <DialogTitle className="text-gray-700 font-bold text-center text-xl dark:text-gray-100">Create Task</DialogTitle>
                        <form action={createTaskHandler} className='min-w-40 w-full flex flex-col gap-4'>
                            {/* <textarea placeholder='Write smth' name="task" className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl'></textarea> */}
                            <ReactQuill className='text-black dark:text-white' theme="snow" value={quillText} onChange={setQuillText} modules={modules} formats={formats} />
                            <button disabled={createTaskLoading} className='p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl dark:bg-gray-100 disabled:bg-indigo-200' type='submit'>{createTaskLoading ? "Process..." : "Create"}</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
