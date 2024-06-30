import React from 'react'
import GetUsers from '@/components/GetUsers'
import { getUserData } from '@/api/auth'
import { getUserHabits } from '@/api/habit'

export default async function page() {

    const user: any = await getUserData()

    const habitsAll = await getUserHabits({ id: user.id })

    return (
        <div className='p-4 flex items-center gap-5 h-fit'>
            <GetUsers habitsAll={habitsAll} />
        </div>
    )
}
