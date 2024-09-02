'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import menuIcon from "../public/images/menu.svg"
import { motion } from 'framer-motion';
import deleteIcon from "../public/images/delete.svg"
import undoIcon from "../public/images/undo.svg"
import statIcon from "../public/images/chart.svg"
import { resetTimerHabit } from '@/api/habitClient'
import resetIcon from "../public/images/reset.svg"
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/store'
export default function HabitStopwatch({ visible, id, timer }: { visible: boolean, id: number, timer: string }) {
    const [now, setNow] = useState(moment())
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)

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
        await resetTimerHabit({ id: id })
        router.refresh()
        setLoading(false)
    }

    return (
        <>
            <div className='h-10 flex items-center justify-center text-xl'>
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
                            <PopoverButton className="cursor-pointer outline-none bg-indigo-400 p-3 rounded-full">
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
                        <button disabled={loading} onClick={resetFromDb} className='p-2 w-full bg-indigo-400 text-gray-700 font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>
                            <Image onClick={resetFromDb} className='cursor-pointer mx-auto' src={resetIcon} width={20} height={20} alt='res' />
                        </button>
                    </form>
                </motion.div>

            }
        </>
    )
}
