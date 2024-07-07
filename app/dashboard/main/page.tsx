import React, { Suspense } from 'react'
import GetUsers from '@/components/GetUsers'
import { getUserData } from '@/api/auth'
import { getUserHabits } from '@/api/habit'
import { Habit } from '@/types'
import { useUser } from '@/store/store'

export default async function page() {
    const user: any = await getUserData()
    const habitsAll: Habit[] = await getUserHabits({ id: user?.id }) || []

    return (
        <div className='p-4 flex items-center gap-5 h-fit'>
            <GetUsers habitsAll={habitsAll} />
        </div>
    )
}
