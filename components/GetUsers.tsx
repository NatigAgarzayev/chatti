'use client'
import React, { useEffect } from 'react'
import HabitInterface from './HabitInterface'
import CreateHabit from './CreateHabit'
import SubmitCreateHabit from './SubmitCreateHabit'
import { Habit } from '@/types'
import { useStore } from '@/store/store'

export default function GetUsers({ habitsAll }: { habitsAll: Array<Habit> }) {


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
        </ul>
    )
}
