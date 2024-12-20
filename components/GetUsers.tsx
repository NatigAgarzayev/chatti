'use client'
import React, {useEffect} from 'react'
import HabitInterface from './HabitInterface'
import {Habit} from '@/types'
import {useHabit, useStore} from '@/store/store'
import StatisticModal from './StatisticModal'
import ConfirmDeleteHabit from './ConfirmDeleteHabit'
import EditHabit from './EditHabit'
import ConfirmNotToday from './ConfirmNotToday'

export default function GetUsers({ habitsAll }: { habitsAll: Array<Habit> }) {

    const statisticModal = useStore(state => state.statisticModal)
    const modalId = useStore(state => state.modalId)
    const confirmDeleteHabitModal = useStore(state => state.confirmDeleteHabitModal)
    const editHabit = useStore(state => state.editHabit)
    const editNotToday = useStore(state => state.editNotToday)
    const updateHabits = useHabit((state: any) => state.updateHabits)
    const habits = useHabit((state: any) => state.habits)

    useEffect(() => {
        updateHabits(habitsAll)
    }, [habitsAll])

    return (
        <ul className='flex flex-wrap w-full'>
            {
                habits.length > 0 ? (
                        habits
                            .sort((a: Habit, b: Habit) => a.pinned === b.pinned ? a.id - b.id : a.pinned ? -1 : 1)
                            .map((item: Habit) => <HabitInterface key={item.id} data={item} />)
                    ) : (
                        <div className='relative text-center w-60 h-fit m-6 p-4 border-2 border-gray-700 dark:border-gray-200 dark:text-gray-200 rounded-3xl'>
                            Let's create a new habit!
                        </div>
                    )
            }
            {
                statisticModal &&
                <StatisticModal dataId={habits.filter((item: Habit) => item.id === modalId)[0].id} />
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
