import React from 'react'
import HabitController from './HabitController'
import { Habit } from '@/types'

export default function HabitInterface({ data }: { data: Habit }) {
    return (
        <div className='w-60 p-4 border-2 border-gray-600 rounded-3xl'>
            <h3 className='text-lg mb-4'>{data.title}:</h3>
            <HabitController id={data.id} count={data.count} />
        </div>
    )
}
