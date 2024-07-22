'use client'
import { deleteHabit, resetTimerHabit } from '@/api/habitClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteIcon from "../images/delete.svg"
import resetIcon from "../images/reset.svg"
import statIcon from "../images/chart.svg"
import React from 'react'
import { useStore } from '@/store/store'

export default function HabitOverlay({ habitId, habitType }: { habitId: number, habitType: string }) {
    const router = useRouter()
    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)


    const deleteFromDb = async () => {
        await deleteHabit({ id: habitId })
        router.refresh()
    }

    const resetFromDb = async () => {
        await resetTimerHabit({ id: habitId })
        router.refresh()
    }

    const showStat = () => {
        updateStatisticModal(true)
        updateModalId(habitId)
    }

    return (
        <div className='absolute left-0 top-0 flex justify-center gap-4 items-center w-full h-1/2 bg-gray-100 bg-opacity-80 rounded-t-3xl'>
            {
                habitType === "count" &&
                <Image onClick={showStat} className='cursor-pointer' src={statIcon} width={20} height={20} alt='stat' />
            }
            <Image onClick={deleteFromDb} className='cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
            {
                habitType === "timer" &&
                <Image onClick={resetFromDb} className='cursor-pointer' src={resetIcon} width={20} height={20} alt='res' />
            }
        </div>
    )
}
