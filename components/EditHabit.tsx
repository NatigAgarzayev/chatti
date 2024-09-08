'use client'
import { getUserHabitById, updateHabit } from '@/api/habitClient'
import { useStore } from '@/store/store'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function EditHabit() {

    const router = useRouter()

    const editHabit = useStore(state => state.editHabit)
    const updateEditHabit = useStore(state => state.updateEditHabit)
    const editHabitId = useStore(state => state.editHabitId)
    const [editHabitLoading, setEditHabitLoading] = useState(false)
    const inputRef1 = useRef<HTMLInputElement>(null)
    const [habitType, setHabitType] = useState<string>("")

    useEffect(() => {
        console.log("asd")
        async function fetchHabitData() {
            setEditHabitLoading(true)
            const res = await getUserHabitById({id: editHabitId})
            if(res) {
                setHabitType(res[0].type)
                console.log(res[0])
            if(inputRef1.current){
                inputRef1.current.value = res[0].title
            }   
            setEditHabitLoading(false)
        }
        }
        fetchHabitData()
    }, [])


    const editHabitHandler = async (formData: FormData) => {
        setEditHabitLoading(true)
        const {habit} = Object.fromEntries(formData)
        await updateHabit({id: editHabitId, title: habit + ""})
        router.refresh()
        setEditHabitLoading(false)
        updateEditHabit(false)
    }

    return (
        <Dialog open={editHabit} onClose={() => updateEditHabit(false)} className="relative z-50">
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
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-3xl w-[370px]">
                        <DialogTitle className="text-gray-700 font-bold text-center text-xl">Edit Habit #{editHabitId}</DialogTitle>
                        <form action={editHabitHandler} className='min-w-40 w-full flex flex-col gap-4'>
                            <label htmlFor="habit" className='-mb-2 font-xl font-semibold'>Habit title:</label>
                            <input id="habit" ref={inputRef1} placeholder='max 20 letters' maxLength={20} type="text" name='habit' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                            <button disabled={editHabitLoading} className={`p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl disabled:bg-indigo-200 ${editHabitLoading && "animate-pulse"} `} type='submit'>{editHabitLoading ? "Process..." : "Update"}</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
