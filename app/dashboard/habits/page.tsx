import React, {Suspense} from 'react'
import GetUsers from '@/components/GetUsers'
import {getUserHabits} from '@/api/habit'
import {Habit} from '@/types'
import {currentUser} from '@clerk/nextjs/server'
import Loading from "./loading"
import {redirect} from 'next/navigation'
import CreateHabit from "@/components/CreateHabit";
import SubmitCreateHabit from "@/components/SubmitCreateHabit";

export default async function page() {
    const user = await currentUser()
    let habitsAll: Habit[] = []

    if (user) {
        habitsAll = await getUserHabits({ id: user.id }) || []
    }
    else{
        redirect("/sign-in")
    }

    return (
        <div className='w-full h-screen p-4 bg-white rounded-l-3xl dark:bg-gray-900 dark:rounded-none'>
            <h2 className='flex items-center gap-4 ml-6 text-xl text-gray-900 dark:text-gray-300 '>
                <p>Habits:</p>
                {
                    habitsAll.length < (user?.publicMetadata.paid ? 10 : 5) &&
                        <CreateHabit>
                            <SubmitCreateHabit/>
                        </CreateHabit>
                }
            </h2>
            <Suspense fallback={<Loading />}>
                <div className='flex items-center gap-5 h-fit'>
                    <GetUsers habitsAll={habitsAll}/>
                </div>
            </Suspense>
        </div>
    )
}
