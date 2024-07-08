'use client'
import { getUserData } from '@/api/authClient'
import { createUserHabit } from '@/api/habitClient'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SubmitCreateHabit() {
    const updateCreateModal = useStore(state => state.updateCreateModal)
    const habitLoading = useStore(state => state.habitLoading)
    const updateHabitLoading = useStore(state => state.updateHabitLoading)
    const router = useRouter()

    const createHabit = async (formData: FormData) => {
        const user: any = await getUserData()
        const { habit, type } = Object.fromEntries(formData)
        if (habit.toString().trim() === "") {
            alert("Please enter a habit")
            return
        }
        updateHabitLoading(true)
        await createUserHabit({ title: habit + "", user: user.id, type: type + "" })
        router.refresh()
        updateHabitLoading(false)
        updateCreateModal(false)
    }

    return (
        <form action={createHabit}>
            <div className='flex flex-col gap-4'>
                <input placeholder='max 26 letters' maxLength={26} type="text" name='habit' className='border-2 p-1 pl-3 py-2 outline-none border-gray-700 rounded-3xl' />
                <button disabled={habitLoading} className='p-2 bg-indigo-400 text-gray-700 font-bold rounded-3xl disabled:bg-indigo-200' type='submit'>{habitLoading ? "Creating..." : "Create"}</button>
            </div>
            <div className='mt-4'>
                <h3 className='font-bold'>Habit type:</h3>
                <div className='flex items-center gap-2'>
                    <input value="count" type="radio" name="type" id="count" defaultChecked />
                    <label htmlFor="count">counter</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input value="timer" type="radio" name="type" id="timer" />
                    <label htmlFor="timer">timer</label>
                </div>
            </div>
        </form>
    )
}
