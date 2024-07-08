'use client'
import React, { useState } from 'react'
import HabitController from './HabitController'
import { Habit } from '@/types'
import HabitStopwatch from './HabitStopwatch'
import HabitOverlay from './HabitOverlay'

export default function HabitInterface({ data }: { data: Habit }) {

    const [visible, setVisible] = useState(false)

    // whitespace-nowrap w-3/4 overflow-hidden text-ellipsis
    return (
        <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative w-60 h-fit m-6 p-4 border-2 border-gray-700 rounded-3xl'>
            {
                visible &&
                <HabitOverlay habitType={data.type} habitId={data.id} />
            }
            <h3 className='text-lg mb-4'>{data.title}</h3>
            {
                data.type === "count" ?
                    <HabitController id={data.id} count={data.count} />
                    :
                    <HabitStopwatch timer={data.created_at} />
            }
        </div>
    )
}
