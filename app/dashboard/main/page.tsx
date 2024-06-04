import { getUserData } from '@/api/auth'
import { getUserHabits } from '@/api/habit'
import HabitInterface from '@/components/HabitInterface'
import { Habit } from '@/types'
import React from 'react'
import CreateHabit from '@/components/CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'

export default async function page() {

    const user: any = await getUserData()

    const habits = await getUserHabits({ id: user.id })

    return (
        <div className='p-4 flex items-center gap-5 h-fit'>
            <ul>
                {
                    habits?.map((item: Habit) => (
                        <HabitInterface key={item.id} data={item} />
                    ))
                }
            </ul>
            <CreateHabit>
                <SubmitCreateHabit />
            </CreateHabit>
        </div>
    )
}
