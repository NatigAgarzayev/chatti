import React, { Suspense } from 'react'
import GetUsers from '@/components/GetUsers'
import { getUserHabits } from '@/api/habit'
import { Habit } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Loading from "./loading"

export default async function page() {
    const { userId }: { userId: string | null } = auth()

    let habitsAll: Habit[] = []

    if (userId) {
        habitsAll = await getUserHabits({ id: userId }) || []
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className='p-4 flex items-center gap-5 h-fit'>
                <GetUsers habitsAll={habitsAll} />
            </div>
        </Suspense>
    )
}
