'use client'
import React, { useEffect } from 'react'
import HabitInterface from './HabitInterface'
import CreateHabit from './CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'
import { Habit } from '@/types'
import { useHabit, useStore } from '@/store/store'
import StatisticModal from './StatisticModal'
import ConfirmDeleteHabit from './ConfirmDeleteHabit'
import EditHabit from './EditHabit'
import ConfirmNotToday from './ConfirmNotToday'
import { useUser } from '@clerk/nextjs'

export default function GetUsers({ habitsAll }: { habitsAll: Array<Habit> }) {

    const statisticModal = useStore(state => state.statisticModal)
    const modalId = useStore(state => state.modalId)
    const confirmDeleteHabitModal = useStore(state => state.confirmDeleteHabitModal)
    const editHabit = useStore(state => state.editHabit)
    const editNotToday = useStore(state => state.editNotToday)
    const updateHabits = useHabit((state: any) => state.updateHabits)
    const habits = useHabit((state: any) => state.habits)
    const {user} = useUser()

    useEffect(() => {
        updateHabits(habitsAll)
    }, [habitsAll])

    return (
        <ul className='flex flex-wrap'>
            {
                habits.length > 0 ? habits
                    ?.sort((a: { id: number }, b: { id: number }) => a.id < b.id ? -1 : 1)
                    ?.map((item: Habit) => (
                        <HabitInterface key={item.id} data={item} />
                    ))
                    :
                    <div className='relative text-center w-60 h-fit m-6 p-4 border-2 border-gray-700 dark:border-gray-200 dark:text-gray-200 rounded-3xl'>
                        Let's create a new habit!
                    </div>
            }
            {
                habits.length < (user?.publicMetadata.paid ? 10 : 5) &&
                <CreateHabit>
                    <SubmitCreateHabit />
                </CreateHabit>
            }
            {
                statisticModal &&
                <StatisticModal data={habits.filter((item: Habit) => item.id === modalId)[0]} />
            }
            {
                confirmDeleteHabitModal &&
                <ConfirmDeleteHabit />
            }
            {
                editHabit && 
                <EditHabit />
            }
            {
                editNotToday &&
                <ConfirmNotToday />
            }   
        </ul>
    )
}
