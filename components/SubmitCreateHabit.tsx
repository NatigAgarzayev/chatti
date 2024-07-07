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
            <input type="text" name='habit' className='border-2 p-1 border-gray-400' />
            <button disabled={habitLoading} className='ml-4 p-2 bg-emerald-100' type='submit'>{habitLoading ? "Creating..." : "Create"}</button>
            <div>
                <div className='flex items-center gap-2'>
                    <input value="count" type="radio" name="type" id="count" defaultChecked />
                    <label htmlFor="count">count</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input value="timer" type="radio" name="type" id="timer" />
                    <label htmlFor="timer">timer</label>
                </div>
            </div>
        </form>
    )
}
