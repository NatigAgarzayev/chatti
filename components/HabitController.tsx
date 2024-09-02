'use client'
import { decreaseHabitCount, increaseHabitCount } from '@/api/habitClient'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import menuIcon from "../public/images/menu.svg"
import { motion } from 'framer-motion';
import deleteIcon from "../public/images/delete.svg"
import undoIcon from "../public/images/undo.svg"
import { useStore } from '@/store/store'
import statIcon from "../public/images/chart.svg"
export default function HabitController({ visible, id, count }: { visible: boolean, id: number, count: number }) {

    const router = useRouter()

    const [countRapid, setCountRapid] = useState(count)
    const [loading, setLoading] = useState(false)

    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)
    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)

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
        setCountRapid(curr => curr - 1)
        await decreaseHabitCount({ id: id, count: countRapid, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    const increase = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setCountRapid(curr => curr + 1)
        await increaseHabitCount({ id: id, count: countRapid, time: moment().format() })
        router.refresh()
        setLoading(false)
    }

    return (
        <>
            <div className='text-center font-bold flex justify-center items-center text-xl mb-3'>{countRapid}</div>
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
                                        <li onClick={decrease} className='p-3 flex item-center gap-2 hover:bg-gray-100'>
                                            <Image src={undoIcon} width={16} height={16} alt='' />
                                            <p>-1</p>
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
                        <button disabled={loading} onClick={increase} className='p-2 w-full bg-indigo-400 text-gray-700 font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>+1</button>
                    </form>
                </motion.div>

            }
        </>
    )
}
