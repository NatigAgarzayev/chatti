'use client'
import React from 'react'
import HabitController from './HabitController'
import { Habit } from '@/types'
import Image from 'next/image'
import deleteIcon from "../images/delete.svg"
import { deleteHabit } from '@/api/habitClient'
import { useRouter } from 'next/navigation'
import HabitStopwatch from './HabitStopwatch'

export default function HabitInterface({ data }: { data: Habit }) {

    const router = useRouter()

    const deleteFromDb = async () => {
        await deleteHabit({ id: data.id })
        router.refresh()
    }
    // whitespace-nowrap w-3/4 overflow-hidden text-ellipsis
    return (
        <div className='relative w-60 h-fit m-6 p-4 border-2 border-gray-700 rounded-3xl'>
            <h3 className='text-lg mb-4 w-[90%]'>{data.title}</h3>
            <Image onClick={deleteFromDb} className='absolute right-4 top-4 cursor-pointer' src={deleteIcon} width={20} height={20} alt='del' />
            {
                data.type === "count" ?
                    <HabitController id={data.id} count={data.count} />
                    :
                    <HabitStopwatch timer={data.created_at} />
            }
        </div>
    )
}
