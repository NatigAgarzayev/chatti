'use client'
import { deleteHabit, resetTimerHabit } from '@/api/habitClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteIcon from "../images/delete.svg"
import resetIcon from "../images/reset.svg"
import React from 'react'

export default function HabitOverlay({ habitId, habitType }: { habitId: number, habitType: string }) {
    const router = useRouter()
    const deleteFromDb = async () => {
        await deleteHabit({ id: habitId })
        router.refresh()
    }

    const resetFromDb = async () => {
        await resetTimerHabit({ id: habitId })
        router.refresh()
    }

    return (
        <div className='absolute left-0 top-0 flex justify-center gap-4 items-center w-full h-1/2 bg-gray-100 bg-opacity-80 rounded-t-3xl'>
            <Image onClick={deleteFromDb} className='cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
            {
                habitType === "timer" &&
                <Image onClick={resetFromDb} className='cursor-pointer' src={resetIcon} width={20} height={20} alt='res' />
            }
        </div>
    )
}
