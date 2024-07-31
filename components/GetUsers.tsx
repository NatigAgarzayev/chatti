'use client'
import React, { useEffect, useState } from 'react'
import HabitInterface from './HabitInterface'
import CreateHabit from './CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'
import { Habit } from '@/types'
import { useStore } from '@/store/store'
import StatisticModal from './StatisticModal'
import ConfirmDeleteHabit from './ConfirmDeleteHabit'
import ConfirmDeleteTask from './ConfirmDeleteTask'

export default function GetUsers({ habitsAll }: { habitsAll: Array<Habit> }) {

    const statisticModal = useStore(state => state.statisticModal)
    const modalId = useStore(state => state.modalId)
    const confirmDeleteHabitModal = useStore(state => state.confirmDeleteHabitModal)

    return (
        <ul className='flex flex-wrap'>
            {
                habitsAll
                    ?.sort((a, b) => a.id < b.id ? -1 : 1)
                    ?.map((item: Habit) => (
                        <HabitInterface key={item.id} data={item} />
                    ))
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

        </ul>
    )
}
