'use client'
import { deleteHabit, resetTimerHabit } from '@/api/habitClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteIcon from "../public/images/delete.svg"
import resetIcon from "../public/images/reset.svg"
import statIcon from "../public/images/chart.svg"
import React from 'react'
import { useStore } from '@/store/store'

export default function HabitOverlay({ habitId, habitType }: { habitId: number, habitType: string }) {
    const router = useRouter()
    const updateStatisticModal = useStore(state => state.updateStatisticModal)
    const updateModalId = useStore(state => state.updateModalId)

    const updateConfirmDeleteModal = useStore(state => state.updateConfirmDeleteHabitModal)



    const deleteFromDb = () => {
        updateConfirmDeleteModal(true)
        updateModalId(habitId)

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
        <div className='absolute left-0 top-0 flex justify-center gap-4 items-center w-full h-1/2 bg-gray-100/70 bg-opacity-80 rounded-t-3xl backdrop-blur-sm'>
            {/* <Image onClick={showStat} className='cursor-pointer' src={statIcon} width={20} height={20} alt='stat' /> */}

            <Image onClick={deleteFromDb} className='cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
            {
                habitType === "timer" &&
                <Image onClick={resetFromDb} className='cursor-pointer' src={resetIcon} width={20} height={20} alt='res' />
            }
        </div>
    )
}
