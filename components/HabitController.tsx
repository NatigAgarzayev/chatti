'use client'
import { decreaseHabitCount, increaseHabitCount } from '@/api/habitClient'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import menuIcon from "../public/images/menu.svg"
import { motion } from 'framer-motion';
import deleteIcon from "../public/images/delete.svg"
import undoIcon from "../public/images/undo.svg"
import { useHabit, useStore } from '@/store/store'
import statIcon from "../public/images/chart.svg"
import editIcon from "../public/images/edit-icon.svg"
import notTodayIcon from "../public/images/nottoday.svg"
import { Habit } from '@/types'

export default function HabitController({ visible, id, count }: { visible: boolean, id: number, count: number }) {

    const router = useRouter()

    const [countRapid, setCountRapid] = useState(0)
    const [loading, setLoading] = useState(false)
    const habits = useHabit((state: any) => state.habits)
    const updateHabits = useHabit((state: any) => state.updateHabits)
    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)
    const updateEditHabit = useStore(state => state.updateEditHabit)
    const updateEditHabitId = useStore(state => state.updateEditHabitId)
    const updateNotToday = useStore(state => state.updateNotToday)


    useEffect(() => {
        const index = habits.findIndex((item: Habit) => item.id === id)
        setCountRapid(habits[index].count)
    }, [habits])

    const deleteFromDb = () => {
        updateConfirmDeleteModal(true)
        updateModalId(id)

    }

    const showStat = () => {
        updateStatisticModal(true)
        updateModalId(id)
    }

    const decrease = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (countRapid === 0) {
            setLoading(false)
            return
        }
        // setCountRapid(curr => curr - 1)

        const newHabitArr = [...habits]
        const index = habits.findIndex((item: Habit) => item.id === id)
        const count = habits[index].count
        newHabitArr[index].count = count - 1
        updateHabits(newHabitArr)
        
        await decreaseHabitCount({ id: id, count: count, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    const increase = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // setCountRapid(curr => curr + 1)

        const newHabitArr = [...habits]
        const index = habits.findIndex((item: Habit) => item.id === id)
        const count = habits[index].count
        newHabitArr[index].count = count + 1
        updateHabits(newHabitArr)

        await increaseHabitCount({ id: id, count: count, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    const editHabit = () => {
        updateEditHabit(true)
        updateEditHabitId(id)
    }

    const notToday = () => {
        updateNotToday(true)
        updateEditHabitId(id)
    }

    return (
        <>
            <div className='text-center font-bold flex justify-center items-center text-xl mb-3 dark:text-white'>{countRapid}</div>
            {
                visible &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    <form className='flex item-center justify-between gap-2'>
                        <Popover>
                            <PopoverButton className="cursor-pointer outline-none bg-indigo-400 dark:bg-white p-3 rounded-full">
                                <Image src={menuIcon} width={32} height={32} alt='' />
                            </PopoverButton>
                            <PopoverPanel anchor="bottom">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0,
                                        ease: [0, 0.71, 0.2, 1.01]
                                    }}
                                >
                                    <ul className='cursor-pointer right-2 top-2 bg-white rounded-3xl border overflow-hidden'>
                                        <li onClick={decrease} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image src={undoIcon} width={16} height={16} alt='' />
                                            <p>-1</p>
                                        </li>
                                        <li onClick={notToday} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image src={notTodayIcon} width={18} height={18} alt='' />
                                            <p>Not today</p>
                                        </li>
                                        <li onClick={editHabit} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image onClick={editHabit} className='cursor-pointer' src={editIcon} width={20} height={20} alt='stat' />
                                            <p>Edit</p>
                                        </li>
                                        <li onClick={showStat} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image onClick={showStat} className='cursor-pointer' src={statIcon} width={20} height={20} alt='stat' />
                                            <p>Statistic</p>
                                        </li>
                                        <li onClick={deleteFromDb} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image onClick={deleteFromDb} className='cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
                                            <p>Delete</p>
                                        </li>
                                    </ul>
                                </motion.div>
                            </PopoverPanel>
                        </Popover>
                        <button disabled={loading} onClick={increase} className='p-2 w-full bg-indigo-400 text-gray-700 dark:bg-white font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>+1</button>
                    </form>
                </motion.div>

            }
        </>
    )
}
