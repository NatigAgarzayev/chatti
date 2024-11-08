'use client'
import {getUserHabitById, updateHabit} from '@/api/habitClient'
import {useHabit, useStore} from '@/store/store'
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import {motion} from 'framer-motion'
import moment from 'moment'
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'
import {Habit} from "@/types"

export default function EditHabit() {

    const router = useRouter()

    const habits = useHabit(state => state.habits)
    const updateHabits = useHabit(state => state.updateHabits)
    const editHabit = useStore(state => state.editHabit)
    const updateEditHabit = useStore(state => state.updateEditHabit)
    const editHabitId = useStore(state => state.editHabitId)
    const [editHabitLoading, setEditHabitLoading] = useState(false)
    const inputRef1 = useRef<HTMLInputElement>(null)
    const inputRef2 = useRef<HTMLInputElement>(null)
    const [habitType, setHabitType] = useState<string>("")
    const [habitInfo, setHabitInfo] = useState<Habit>( {
        id: 0,
        title: "Undefined",
        created_at: "No time",
        author_id: "None",
        count: 0,
        type: "timer",
        records: [],
        streak: 0,
    })
    const [radioValue, setRadioValue] = useState<string>("delete")


    useEffect(() => {
        async function fetchHabitData() {
            setEditHabitLoading(true)
            const res = await getUserHabitById({id: editHabitId})
            if(res) {
                setHabitInfo(res[0])
                setHabitType(res[0].type)
                setTimeout(() => {
                    if(inputRef1.current){
                        inputRef1.current.value = res[0].title
                    }   
                    if(inputRef2.current) {
                        inputRef2.current.value = moment(res[0].created_at).format('YYYY-MM-DDTHH:mm')
                    }
                    setEditHabitLoading(false)
                }, 100)
            }
        }
        fetchHabitData()
    }, [editHabitId])


    const editHabitHandler = async (formData: FormData) => {
        setEditHabitLoading(true);

        const habit = formData.get('habit') as string;
        const timer = formData.get('timer') as string;
        const actionType = formData.get('actionType') as string;
        const addCount = formData.get('habitAddCount') as string;
    
        const habitRecord = formData.getAll('habitRecord').map(record => JSON.parse(record as string));

        const res = await updateHabit({
            id: editHabitId,
            title: habit || "",
            type: habitType,
            created_at: timer || "",
            habitRecord: habitRecord || [],
            actionType: actionType,
            addCount: +addCount,
        });

        const index = habits.findIndex(habit => habit.id === editHabitId)
        const newHabitArr = [...habits]
        if(res) {
            newHabitArr[index] = res[0]
            updateHabits(newHabitArr)
        }
        router.refresh()
        setEditHabitLoading(false);
        updateEditHabit(false);
    };

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
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-3xl dark:bg-gray-800 w-[370px]">
                        <DialogTitle className="text-gray-700 font-bold text-center text-xl dark:text-gray-100">Edit Habit #{editHabitId}</DialogTitle>
                        <form action={editHabitHandler} className='min-w-40 w-full flex flex-col gap-4'>
                            <label htmlFor="habit" className='-mb-2 font-xl font-semibold dark:text-gray-100'>Habit title:</label>
                            <input id="habit" ref={inputRef1} placeholder='max 20 letters' maxLength={20} type="text" name='habit' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                            {
                                habitType === "timer" ?
                                <>
                                    <label htmlFor="timer" className='-mb-2 font-xl font-semibold dark:text-gray-100'>Habit timer:</label>
                                    <input ref={inputRef2} id="timer" type="datetime-local" name='timer' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                                </>
                                :
                                <>
                                    <label htmlFor="habitType" className='-mb-2 font-xl font-semibold dark:text-gray-100'>Habit records:</label>
                                    <ul className='h-40 overflow-y-auto border p-2'>
                                        {
                                            habitInfo?.records.map((option, index) => (
                                                <li key={index} className='flex items-center gap-2'>
                                                    <input type="checkbox" name='habitRecord' id={`option${index}`} value={JSON.stringify(option)} />
                                                    <label htmlFor={`option${index}`} className='font-semibold dark:text-gray-100'>({option.value}) - {option.day}</label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <label htmlFor="habitType" className='-mb-2 font-xl font-semibold dark:text-gray-100'>Action:</label>
                                    <div>
                                        <div className='flex items-center gap-2' onClick={() => setRadioValue("delete")}>
                                            <input defaultChecked type="radio" name='actionType' id="recordDelete" value="delete" />
                                            <label htmlFor="recordDelete" className='dark:text-gray-100'>Delete</label>
                                        </div>
                                        <div className='flex items-center gap-2' onClick={() => setRadioValue("add")}>
                                            <input type="radio" name='actionType' id="recordAdd" value="add"  />
                                            <label htmlFor="recordAdd" className='dark:text-gray-100'>Add count by</label>
                                        </div>
                                        {
                                            radioValue === "add" &&
                                            <input defaultValue={1} type="number" name='habitAddCount' min={1} className='border-2 p-1 pl-3 outline-none border-gray-700 rounded-3xl' />
                                        }
                                    </div>
                                </>
                            }
                            <button disabled={editHabitLoading} className={`p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl dark:bg-gray-100 disabled:bg-indigo-200 ${editHabitLoading && "animate-pulse"} `} type='submit'>{editHabitLoading ? "Process..." : "Update"}</button>
                        </form>
                    </DialogPanel>
                </motion.div>
            </div>
        </Dialog>
    )
}
