'use client'
import { getQuillContent, updateQuillContent } from '@/api/kanbanClient'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function EditTask() {
    const deadlineRef = useRef<HTMLInputElement>(null)
    const editTask = useStore(state => state.editTask)
    const updateEditTask = useStore(state => state.updateEditTask)
    const [quillText, setQuillText] = useState('')

    const editTaskId = useStore(state => state.editTaskId)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ text, deadline }: { text: string, deadline: string }) => {
            await updateQuillContent({ id: editTaskId, content: text, deadline: deadline })
        },
        onSuccess: () => {
            updateEditTask(false)
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    const fetchData = useQuery({
        queryKey: ['tasks', editTaskId],
        queryFn: async () => {
            const res = await getQuillContent(editTaskId)
            setQuillText(res.content)
            if (res.deadline) {
                setTimeout(() => {
                    if (deadlineRef.current) {
                        deadlineRef.current.value = moment(res.deadline).format('YYYY-MM-DDTHH:mm')
                    }
                }, 100)
            }
        },
        enabled: !!editTaskId,
    })

    const editTaskHandler = (formData: FormData) => {
        const deadline = formData.get('deadline') as string
        if (quillText.toString().trim() === "") {
            alert("Fill required input")
            return
        }
        mutation.mutate({ text: quillText.toString(), deadline: deadline })
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
        <Dialog open={editTask} onClose={() => updateEditTask(false)} className="relative z-50">
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
                    <DialogPanel className="max-w-lg space-y-4 border bg-white dark:bg-gray-800 p-6 rounded-3xl md:w-[570px] w-[370px]">
                        <DialogTitle className="text-gray-700 font-bold text-center text-xl dark:text-gray-100">Edit Task #{editTaskId}</DialogTitle>
                        <form action={editTaskHandler} className='min-w-40 w-full flex flex-col gap-4'>
                            {/* <textarea placeholder='Write smth' name="task" className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl'></textarea> */}
                            <ReactQuill className='text-black dark:text-white' theme="snow" value={quillText} onChange={setQuillText} modules={modules} formats={formats} />
                            <p className='text-gray-700 dark:text-gray-100 font-bold'>Deadline</p>
                            <input ref={deadlineRef} name='deadline' type="datetime-local" className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                            <button disabled={mutation.isPending || fetchData.isLoading} className={`p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl dark:bg-gray-100 disabled:bg-indigo-200 ${(fetchData.isLoading || mutation.isPending) && "animate-pulse"} `} type='submit'>{mutation.isPending ? "Process..." : "Update"}</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
