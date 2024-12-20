'use client'
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import moment from 'moment'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import menuIcon from "../public/images/menu.svg"
import {motion} from 'framer-motion';
import deleteIcon from "../public/images/delete.svg"
import statIcon from "../public/images/chart.svg"
import {resetTimerHabit} from '@/api/habitClient'
import resetIcon from "../public/images/reset.svg"
import {useHabit, useStore} from '@/store/store'
import editIcon from "../public/images/edit-icon.svg"


export default function HabitStopwatch({ visible, id, timer }: { visible: boolean, id: number, timer: string }) {
    const [now, setNow] = useState(moment())
    const [loading, setLoading] = useState(false)

    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)
    const updateEditHabit = useStore(state => state.updateEditHabit)
    const updateEditHabitId = useStore(state => state.updateEditHabitId)
    const habits = useHabit(state => state.habits)
    const updateHabits = useHabit(state => state.updateHabits)

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const deleteFromDb = () => {
        setLoading(true)
        updateConfirmDeleteModal(true)
        updateModalId(id)
        setLoading(false)
    }

    const showStat = () => {
        setLoading(true)
        updateStatisticModal(true)
        updateModalId(id)
        setLoading(false)
    }

    const resetFromDb = async () => {
        setLoading(true)
        const res = await resetTimerHabit({ id: id })
        console.log('resetted = ', res)

        const newHabitArr = [...habits]
        const index = newHabitArr.findIndex(habit => habit.id === id)
        if(res){
            newHabitArr[index] = res[0]
            updateHabits(newHabitArr)
        }

        setLoading(false)
    }

    const editHabit = () => {
        updateEditHabit(true)
        updateEditHabitId(id)
    }

    return (
        <>
            <div className='h-10 flex items-center justify-center text-xl dark:text-white timer-tabular font-bold'>
                <Moment duration={timer} date={now} format="HH : mm : ss" />
            </div>
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
                    <form className='flex item-center justify-between gap-2 mt-2'>
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
                        <button disabled={loading} onClick={resetFromDb} className='p-2 w-full bg-indigo-400 text-gray-700 dark:bg-white font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>
                            <Image onClick={resetFromDb} className='cursor-pointer mx-auto' src={resetIcon} width={20} height={20} alt='res' />
                        </button>
                    </form>
                </motion.div>

            }
        </>
    )
}
