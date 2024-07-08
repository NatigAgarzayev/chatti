'use client'
import { deleteHabit } from '@/api/habitClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteIcon from "../images/delete.svg"
import React from 'react'

export default function HabitOverlay({ habitId }: { habitId: number }) {
    const router = useRouter()
    const deleteFromDb = async () => {
        await deleteHabit({ id: habitId })
        router.refresh()
    }

    return (
        <div className='absolute left-0 top-0 flex justify-center gap-4 items-center w-full h-1/2 bg-gray-100 bg-opacity-80 rounded-t-3xl'>
            <Image onClick={deleteFromDb} className='cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
        </div>
    )
}
