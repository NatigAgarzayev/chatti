'use client'
import { getUserHabits } from '@/api/habitClient'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CreateHabit from './CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'
import GetUsers from './GetUsers'
import MainSkeleton from './MainSkeleton'

export default function Habits({user}: {user: any}) {

    const {data: habitsAll, isLoading: habitsAllLoading} = useQuery({
        queryKey: ['habits'],
        queryFn: async () => {
            const res = await getUserHabits({ id: user.id })
            return res
        },
        enabled: !!user,
    })

    if(habitsAllLoading){
        return (
            <div className='flex w-full h-screen bg-white dark:bg-gray-900'>
                <MainSkeleton />
                <MainSkeleton />
            </div>
        )
    }

    return (
     <>
        {
            habitsAll && (
                <div className='w-full h-screen p-4 bg-white rounded-l-3xl dark:bg-gray-900 dark:rounded-none'>
                    <h2 className='flex h-12 items-center gap-4 ml-6 text-xl text-gray-900 dark:text-gray-300'>
                        <p>
                            {habitsAll.length === (user.publicMetadata.paid ? 15 : 5) ?
                                'You have reached the maximum amount of habits. Chatti Pro is required to create 15.'
                                :
                                habitsAll.length === 0 ? 'You have no habits.' : 'Create a new habit'}
                        </p>
                        {
                            habitsAll.length < (user.publicMetadata.paid ? 15 : 5) &&
                                <CreateHabit>
                                    <SubmitCreateHabit/>
                                </CreateHabit>
                        }
                    </h2>
                        <div className='flex items-center gap-5 h-fit'>
                            <GetUsers habitsAll={habitsAll}/>
                        </div>
                </div>
            )
        }
    </>
    )
}