'use client'
import React from 'react'
import HabitInterface from './HabitInterface'
import CreateHabit from './CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'
import { Habit } from '@/types'
import { useStore } from '@/store/store'
import StatisticModal from './StatisticModal'
import ConfirmDeleteHabit from './ConfirmDeleteHabit'
import EditHabit from './EditHabit'

export default function GetUsers({ habitsAll }: { habitsAll: Array<Habit> }) {

    const statisticModal = useStore(state => state.statisticModal)
    const modalId = useStore(state => state.modalId)
    const confirmDeleteHabitModal = useStore(state => state.confirmDeleteHabitModal)
    const editHabit = useStore(state => state.editHabit)

    return (
        <ul className='flex flex-wrap'>
            {
                habitsAll.length > 0 ? habitsAll
                    ?.sort((a, b) => a.id < b.id ? -1 : 1)
                    ?.map((item: Habit) => (
                        <HabitInterface key={item.id} data={item} />
                    ))
                    :
                    <div className='relative text-center w-60 h-fit m-6 p-4 border-2 border-gray-700 rounded-3xl'>
                        Let's create a new habit!
                    </div>
            }
            {
                habitsAll.length < 5 &&
                <CreateHabit>
                    <SubmitCreateHabit />
                </CreateHabit>
            }
            {
                statisticModal &&
                <StatisticModal data={habitsAll.filter(item => item.id === modalId)[0]} />
            }
            {
                confirmDeleteHabitModal &&
                <ConfirmDeleteHabit />
            }
            {
                editHabit && <EditHabit />
            }

        </ul>
    )
}
